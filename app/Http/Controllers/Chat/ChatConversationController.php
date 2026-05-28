<?php

namespace App\Http\Controllers\Chat;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use App\Models\Trip;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChatConversationController extends Controller
{
    public function openOrCreatePersonal(Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
        ]);

        $me = $request->user();
        $otherId = (int) $data['user_id'];

        abort_if($otherId === $me->id, 422, 'Cannot chat with yourself.');

        $conversationId = Conversation::query()
            ->where('is_group', false)
            ->whereNull('trip_id')
            ->whereNull('pergi_bareng_id')
            ->whereHas('participants', fn ($q) => $q->where('users.id', $me->id))
            ->whereHas('participants', fn ($q) => $q->where('users.id', $otherId))
            ->value('id');

        if (! $conversationId) {
            $conversation = DB::transaction(function () use ($me, $otherId) {
                $conv = Conversation::create([
                    'trip_id' => null,
                    'pergi_bareng_id' => null,
                    'is_group' => false,
                ]);

                $conv->participants()->attach($me->id, ['last_read_at' => now()]);
                $conv->participants()->attach($otherId, ['last_read_at' => now()]);

                return $conv;
            });

            $conversationId = $conversation->id;
        }

        return redirect()->route('chat.show', ['conversation' => $conversationId]);
    }

    public function openOrCreateTripGroup(Request $request, Trip $trip){
        $me = $request->user();
        $isGuider = (int) $trip->guider_id === (int) $me->id;

        $isParticipants = DB::table('trip_participants')->where('trip_id', $trip->id)->where($me->id)->exists();
        abort_unless($isGuider || $isParticipants, 403, 'Kamu tidka punya akses ke group chat ini.');

        $conversationId = Conversation::query()->where('is_group', true)->where('trip_id', $trip->id)
        ->value('id');

        if (! $conversationId) {
            $conversation = DB::transaction(function () use ($trip) {
                return Conversation::create([
                    'trip_id' => $trip->id,
                    'pergi_bareng_id' => null,
                    'is_group' => true,
                ]);
            });

            $conversationId = $conversation->id;
        }

        $participantIds = DB::table('trip_participants')
            ->where('trip_id', $trip->id)
            ->whereNotNull('user_id')
            ->pluck('user_id')
            ->unique()
            ->values()
            ->all();

        $allIds = collect($participantIds)
            ->push($trip->guider_id)
            ->unique()
            ->values();

        $conv = Conversation::findOrFail($conversationId);
        $existing = $conv->participants()->pluck('users.id')->all();
        $toAttach = $allIds->diff($existing);

        foreach ($toAttach as $uid) {
            $conv->participants()->attach($uid, ['last_read_at' => now()]);
        }
        return redirect()->route('chat.show', ['conversation' => $conversationId]);
    }
}

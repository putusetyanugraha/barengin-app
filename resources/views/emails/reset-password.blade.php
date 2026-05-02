<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body style="margin:0; padding:0; background:#FAFAFA; font-family:Arial, sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA; padding:28px 0;">
    <tr>
        <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border:1px solid #E1E1E1; border-radius:16px; overflow:hidden;">
                <!-- Header / Brand -->
                <tr>
                    <td style="padding:18px 22px; background:#ffffff;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                                <td style="vertical-align:middle;">
                                    <!-- Logo (optional) -->
                                    <img
                                        src="{{ rtrim(config('app.url'), '/') . '/assets/barengin_logows.png' }}"
                                        alt="{{ config('app.name') }}"
                                        width="110"
                                        style="display:block; height:auto; border:0; outline:none;"
                                    />
                                </td>
                                <td style="vertical-align:middle; text-align:right;">
                                    <div style="font-size:12px; color:#8E8E8E; line-height:1.4;">
                                        Permintaan Reset Kata Sandi
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>

                <!-- Accent line -->
                <tr>
                    <td style="padding:0; height:3px; background:#0078cf; line-height:0; font-size:0;"></td>
                </tr>

                <!-- Content -->
                <tr>
                    <td style="padding:22px 22px 22px; color:#1F1F1F;">
                        <h1 style="margin:0 0 10px; font-size:20px; line-height:1.3; font-weight:700; color:#1F1F1F;">
                            Reset Password
                        </h1>

                        <p style="margin:0 0 14px; color:#4B4B4B; font-size:14px; line-height:1.7;">
                            Halo <strong style="color:#1F1F1F; font-weight:700;">{{ $user->full_name ?? 'User' }}</strong>,
                            kami menerima permintaan untuk mengatur ulang kata sandi akun Anda.
                            Klik tombol di bawah ini untuk membuat kata sandi baru.
                        </p>

                        <!-- Button (centered) -->
                        <div style="margin:18px 0 18px; text-align:center;">
                            <a href="{{ $url }}"
                               style="display:inline-block; background:#0078cf; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:12px; font-weight:600; font-size:14px;">
                                Reset Password
                            </a>
                        </div>

                        <!-- Info box -->
                        <div style="margin:0 0 16px; border:1px solid #E1E1E1; background:#F4FAFF; border-radius:12px; padding:12px 14px;">
                            <div style="font-size:12px; color:#4B4B4B; line-height:1.6; font-weight:400;">
                                Link ini hanya berlaku untuk waktu terbatas. Jika Anda tidak merasa meminta reset kata sandi, abaikan email ini.
                            </div>
                        </div>

                        <p style="margin:0 0 8px; color:#8E8E8E; font-size:12px; line-height:1.6;">
                            Jika tombol di atas tidak berfungsi, salin dan tempel tautan berikut ke browser Anda:
                        </p>

                        <p style="word-break:break-all; margin:0; font-size:12px; line-height:1.6;">
                            <a href="{{ $url }}" style="color:#0078cf; text-decoration:underline;">
                                {{ $url }}
                            </a>
                        </p>

                        <hr style="border:none; border-top:1px solid #E1E1E1; margin:18px 0;">

                        <p style="margin:0; color:#8E8E8E; font-size:12px; line-height:1.6;">
                            Butuh bantuan? Balas email ini atau hubungi tim support {{ config('app.name') }}.
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding:14px 22px; background:#F5F5F5; color:#8E8E8E; font-size:12px; line-height:1.5;">
                        © {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
                    </td>
                </tr>
            </table>

            <div style="width:600px; max-width:600px; padding:10px 0 0; text-align:center; color:#CACACA; font-size:11px; line-height:1.4;">
                Email ini dikirim secara otomatis, mohon jangan membagikan tautan reset Anda kepada siapa pun.
            </div>
        </td>
    </tr>
</table>
</body>
</html>
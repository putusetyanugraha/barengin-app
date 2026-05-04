import Button from "@/Components/Button";
import Input from "@/Components/Input";

export default function Index(){
    return (
        <div className="div">
            <Button
                isButtonLink={true}
                href="/"
                size="lg"
            >Cari Trip
            </Button>

            <Input label="Tujuan Trip" placeholder="Masukkan tujuan trip Anda" />
        </div>
    )
}
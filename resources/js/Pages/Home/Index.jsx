import MainLayout from "@/Layouts/MainLayout";
import Button from "@/Components/Button";

export default function Home() {
    return (
        <>
            <h1 className="text-xl">Home</h1>
            <Button type="primary">Click me</Button>
        </>
    );
}

Home.layout = (page) => <MainLayout children={page} />;

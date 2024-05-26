// USER-SIDE LAYOUT //
// 
import UniversalLayout from "../_components/universal_layout";

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <UniversalLayout homeURL="/" options={null}>
            {children}
        </UniversalLayout>
    );
}
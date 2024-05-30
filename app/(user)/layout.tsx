// USER-SIDE LAYOUT //
// user zone general page layout
import { ProblemsIcon, SandboxIcon } from "../_components/globalstyle";
import { IMenuOption } from "../_components/menu_option";
import UniversalLayout from "../_components/universal_layout";

// All menu options
const menuOptions: IMenuOption[] = [
    { text: "Problems", destinationURL: "/problems", icon: <ProblemsIcon /> },
    { text: "Sandbox", destinationURL: "/sandbox", icon: <SandboxIcon /> },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <UniversalLayout homeURL="/" options={menuOptions}>
            {children}
        </UniversalLayout>
    );
}
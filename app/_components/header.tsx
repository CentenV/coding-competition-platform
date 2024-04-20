// HEADER COMPONENT //
// The header to every page within the dashboard page
import { background, foreground, primaryTextColor } from "./globalstyle";

export default function Header({ title }: { title: string }) {
    return (
        <div className={`${foreground} ${primaryTextColor} font-bold text-4xl`}>{title}</div>
    );
}
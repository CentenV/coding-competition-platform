// HEADER COMPONENT //
// The header to every page within the dashboard page
import { foreground } from "./globalstyle";

export default function Header({ title }: { title: string }) {
    return (
        <div className={`${foreground} font-bold text-4xl mb-5`}>{title}</div>
    );
}
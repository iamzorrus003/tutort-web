import { Link } from "react-router-dom";

export default function RootComp() {
    return (
        <div className="p-5 *:block *:w-fit *:not-[h1]:pl-4 *:not-[h1]:hover:underline text-lg">
            <h1 className="text-2xl font-bold">Select a Draft</h1>
            <a href="/blue/index.html">Blue - Course Page</a>
            <a href="/orange/index.html">Orange (new) - Course Page</a>
            <a href="/multi/index.html">Multi (both) - Course Page</a>
            <Link to={'/mockup-landing-draft-1'}>Mockup Landing - 1</Link>
        </div>
    )
}

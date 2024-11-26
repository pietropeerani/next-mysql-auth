import Link from "next/link"
import { getUser, verifySession } from "./lib/dal"

interface settings {
    [key: string]: [
        {
            field: string,
            sub: string,
            link: string
        }
    ]
}

const settingsFields: settings = {
    "User": [
        {
            field: "e",
            sub: "",
            link: ""
        }
    ]
}

export default function Home() {
    const session = verifySession()

    return (
        <>Private page</>
    )
}
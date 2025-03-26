import type { Notification } from "../../../lib/definitions";
import { useState } from "react";

export default function Notification() {
    const [messageList, setMessageList] = useState<Notification[] | null>(null);
    return (
        <>
            <div>
                {messageList ? (
                    <ul>
                        {messageList.map((message) => (
                            <li>
                                <p>{message.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">You don't have notifications.</p>
                    </div>
                )}
            </div>
        </>
    );
}
import { useSearchParams, useSubmit } from "react-router-dom";
import { useState } from "react";
import type { Posts } from "../../../lib/definitions";
import { Form } from "react-bootstrap";

export default function Explore() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [postList, setPostList] = useState<Posts[] | null>(null);
    const submit = useSubmit();

    return (
        <>
            <div>
                <Form>
                    <Form.Control className="text-xl" type="text" placeholder="Search" onChange={(e) => { submit(e.currentTarget.form); }} />
                </Form>
            </div>
            <div className="mt-10">
                {postList ? (
                    <>
                    </>
                ) : (
                    <div className="flex justify-center">
                        <p className="text-xl text-grey-700 ">No results.</p>
                    </div>
                )}
            </div>
        </>
    );
}
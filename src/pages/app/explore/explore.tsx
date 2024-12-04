import { useState } from "react";
import type { Post } from "../../../lib/definitions";
import { Form, Button } from "react-bootstrap";

export default function Explore() {
    const [postList, setPostList] = useState<Post[] | null>(null);

    return (
        <>
            <div>
                <Form className="flex gap-2">
                    <Form.Control className="text-xl" type="text" placeholder="Search"  />
                    <Button variant="primary" type="submit">
                        Search
                    </Button>
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
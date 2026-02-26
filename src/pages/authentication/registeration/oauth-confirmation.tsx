import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { SetOauthUsernameProp, UserProp } from "../../../lib/propinterfaces";
import { createOauthUsername, register } from "../../../lib/actions";
import { useNavigate } from "react-router-dom";
import { useParams } from "next/navigation";

export default function OauthConfirmation() {
    return (
        <div className="w-96">
            <p className="text-center text-lg font-bold">Confirm</p>
            <div className="d-grid">
                <Button variant="primary" type="button" href="/">
                    Login
                </Button>
            </div>
        </div>
    );
}
// 
//
import { ISessionId } from "@/app/types";

// Session ID Management
let session_store: ISessionId[] = [];

export function addSession(newSession: ISessionId) {
    session_store.push(newSession);
}

export function clearSessions() {
    session_store = [];
}

export function printSessionStore() {
    console.log("Session store dump:");
    session_store.forEach((value) => {
        console.log(JSON.stringify(value));
    })
}

export function findSession(uid: string, session_id: string): ISessionId | null {
    // TODO: convert userid to a more unique string
    let foundSession: ISessionId | null = null;
    session_store.forEach((currentSessionEntry: ISessionId) => {
        if (currentSessionEntry.userId && currentSessionEntry.sessionId) {
            foundSession = currentSessionEntry;
            return;
        }
    });

    return foundSession;
}
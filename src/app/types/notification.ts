import { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { View as EmbedExternal } from "@atproto/api/dist/client/types/app/bsky/embed/external";
import { View as EmbedImage } from "@atproto/api/dist/client/types/app/bsky/embed/images";
import { View as EmbedRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";
import { View as EmbedRecordWithMedia } from "@atproto/api/dist/client/types/app/bsky/embed/recordWithMedia";
import { Label } from "@atproto/api/dist/client/types/com/atproto/label/defs";

export interface Notification {
    subjectUri: string;
    reason:     'like' | 'mention' | 'follow' | 'quote' | 'repost' | 'reply';
    post:       Post;
    datas:      Data[];
}

export interface Data {
    uri:           string;
    cid:           string;
    author:        DataAuthor;
    reason:        string;
    reasonSubject: string;
    record:        DataRecord;
    isRead:        boolean;
    indexedAt:     Date;
    labels:        any[];
    post:          Post;
}

export interface DataAuthor {
    did:         string;
    handle:      string;
    displayName: string;
    description: string;
    avatar:      string;
    indexedAt:   Date;
    viewer:      PurpleViewer;
    labels:      any[];
}

export interface PurpleViewer {
    muted:      boolean;
    blockedBy:  boolean;
    following:  string;
    followedBy: string;
}

export interface Post {
    uri: string;
    cid: string;
    author: ProfileViewBasic;
    record: { text?:string };
    embed?: EmbedImage | EmbedExternal | EmbedRecord | EmbedRecordWithMedia | {
        $type: string;
        [k: string]: any;
    };
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    indexedAt: string;
    viewer?: ViewerState;
    labels?:Label[];
    [k: string]: unknown;
}

export interface PostAuthor {
    did:         string;
    handle:      string;
    displayName: string;
    avatar:      string;
    viewer:      FluffyViewer;
    labels:      any[];
}

export interface FluffyViewer {
    muted:     boolean;
    blockedBy: boolean;
}

export interface PostRecord {
    text:      string;
    $type:     string;
    reply:     Reply;
    createdAt: Date;
}

export interface Reply {
    root:   Subject;
    parent: Subject;
}

export interface Subject {
    cid: string;
    uri: string;
}

export interface PostViewer {
}

export interface DataRecord {
    $type:     string;
    subject:   Subject;
    createdAt: Date;
}

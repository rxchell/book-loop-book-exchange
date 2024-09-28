export type Username = string;
export type Email = string;
export type Name = string;
export type Gender = 
    | "M"
    | "F"
    | "-";

export type Interest = string;

export type User = {
    username: Username,
    email: Email,
    firstName: Name,
    lastName: Name,
    gender?: Gender,
    interests?: Interest[],
    lookingFor?: Interest[],
    chats?: Record<string, string>,
    friends?: Record<string, "None" | "Requested" | "Pending" | "Friend">
    profile?: string
    online?: boolean
    booksListed?: Record<string, string>  
    booksExchanged?: Record<string, string>
    booksLiked?: Record<string, string>
}
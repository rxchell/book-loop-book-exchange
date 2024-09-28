import {User} from "@/types/user"
import {
    getFirestore,
    Firestore,
    doc,
    setDoc,
    getDoc,
    arrayUnion,
    updateDoc,
    setLogLevel,
    query, collection, where, getDocs
} from "firebase/firestore";
import firebase_app from "@/firebase/config";
import {escapeEmail, unescapeEmail} from "@/utils/escaping";

export const db: Firestore = getFirestore(firebase_app);
setLogLevel('debug');

export function createUser(email: string,
                           firstName: string,
                           lastName: string,
                           username: string
): User {
    return {
        email: email,
        firstName: firstName,
        lastName: lastName,
        username: username,
    }
}

export async function addNewUser(user: User): Promise<void> {
    await setDoc(doc(db, "users", user.email as string), {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
    });
}

export async function retrieveUser(email: string): Promise<User> {
    const record = await getDoc(doc(db, "users", email));

    if (!record.exists() || record.data() === undefined) {
        throw new Error("Invalid data");
    } else {
        return record.data() as User
    }
}

export async function refreshUser(email: string): Promise<User> {
    const userDoc = await getDoc(doc(db, 'users', email));
    if (!userDoc.exists()) {
        throw new Error('User does not exist');
    }
    return userDoc.data() as User;
}

const filterRecordByValue = (record:  Record<string, string>,
                             target: string): Record<string, string> => {
    const filteredRecord: Record<string, string> = {};

    // Iterate through each key-value pair in the record
    Object.entries(record).forEach(([key, value]) => {
        // Apply the filter condition
        if (value == target) {
            filteredRecord[key] = value;
        }
    });

    return filteredRecord;
};

export async function retrieveUserFriends(email: string): Promise<string[]> {
    const user = await retrieveUser(email)
    const friends = user.friends ?? {}
    const friendNames = Object.keys(filterRecordByValue(friends, "Friend"))
        .map(unescapeEmail)
    const allUsers = await getAllUsers()
    return allUsers
        .filter(user => friendNames.includes(user.email ?? ""))
        .map(user => user.username ?? "")
}

export async function retrieveUserFriendsUsers(email: string): Promise<User[]> {
  const user = await retrieveUser(email);
  const friends = user.friends ?? {};
  const friendEmails = Object.keys(filterRecordByValue(friends, "Friend")).map(unescapeEmail);
  const allUsers = await getAllUsers();
  return allUsers.filter(user => friendEmails.includes(user.email ?? ""));
}

export async function retrieveFriendRequests(email: string): Promise<User[]> {
    const user = await retrieveUser(email)
    const friends = user.friends ?? {}
    const friendUsers = Object.keys(filterRecordByValue(friends, "Pending"))
        .map(unescapeEmail)
    const allUsers = await getAllUsers()
    return allUsers
        .filter(user => friendUsers.includes(user.email ?? ""))
}

export async function retrieveFriendRequestsCount(email:string): Promise<number> {
    const user = await retrieveUser(email)
    const friends = user.friends ?? {}
    const friendUsers = Object.keys(filterRecordByValue(friends, "Pending"))
        .map(unescapeEmail)
    return friendUsers.length;
}

export async function updateUserData(user: User) {
    const docRef = doc(db, "users", user.email);
    await updateDoc(docRef, user);
}

export async function retrieveUserFromUsername(user: string) {
    const q = query(
        collection(db, "users"),
        where("username", "==", user)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.size == 0 ? null : querySnapshot.docs[0].data() as User;
}

export async function getAllUsers() {
    const q = query(
        collection(db, "users"),
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data() as User);
}

export async function checkEmailExists(email: string): Promise<boolean> {
    const allUsers = await getAllUsers();
    return allUsers
        .filter(u => u.email == email)
        .length != 0;
}

export async function checkUsernameExists(username: string): Promise<boolean> {
    const allUsers = await getAllUsers();
    return allUsers
        .filter(u => u.username == username)
        .length != 0;
}

export async function checkRelationship(currentUser: string, otherUser: string): Promise<string> {
    const user = await retrieveUser(currentUser)
    const escaped = escapeEmail(otherUser)
    const friendsList = user.friends ?? {}
    return (escaped in friendsList)
        ? friendsList[escaped]
        : "None"
}

export async function sendFriendRequest(currentUser: string, otherUser: string): Promise<void> {
    const currentDocRef = doc(db, "users", currentUser)
    const otherDocRef = doc(db, "users", otherUser)

    const currentNestedKey = "friends." + escapeEmail(otherUser);
    const otherNestedKey = "friends." + escapeEmail(currentUser);

    if (await checkRelationship(currentUser, otherUser) == "None") {

        await updateDoc(currentDocRef, {
            [currentNestedKey]: "Requested"
        })
        await updateDoc(otherDocRef, {
            [otherNestedKey]: "Pending"
        })
    }
    if (await checkRelationship(currentUser, otherUser) == "Pending") {

        await updateDoc(currentDocRef, {
            [currentNestedKey]: "Friend"
        })
        await updateDoc(otherDocRef, {
            [otherNestedKey]: "Friend"
        })
    }
}

export async function acceptFriendRequest(currentUser: string, otherUser: string): Promise<void> {
    if (await checkRelationship(currentUser, otherUser) == "Pending") {
        const currentDocRef = doc(db, "users", currentUser)
        const otherDocRef = doc(db, "users", otherUser)

        const currentNestedKey = "friends." + escapeEmail(otherUser);
        const otherNestedKey = "friends." + escapeEmail(currentUser);

        await updateDoc(currentDocRef, {
            [currentNestedKey]: "Friend"
        })

        await updateDoc(otherDocRef, {
            [otherNestedKey]: "Friend"
        })
    }

}
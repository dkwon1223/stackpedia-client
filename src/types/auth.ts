export type UserLoginResponse = {
    user: {
        userId: number;
        username: string;
        email: string;
    },
    jwt: string;
}

export type UserLoginPayload = {
    usernameOrEmail: string;
    password: string; 
};

export type UserSignupPayload = {
    username: string;
    email: string;
    password: string;
};

export type UserDetails = {
    userId: number;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: UserDetails | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (loginCredentials: UserLoginPayload) => Promise<void>;
    logout: () => Promise<void>;
    signup: (signupCredentials: UserSignupPayload) => Promise<void>;
    handleOAuthCallback: () => void;
}

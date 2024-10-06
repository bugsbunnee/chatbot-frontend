import { z } from 'zod';

const getValidateEmailDomain = (email: string) => {
    if (email.indexOf('@') === -1) return false;


    return email.split('@')[1].indexOf('russelsmithgroup.com') !== -1
}

export const emailSchema = z.object({
    email: z.string()
            .email()
            .refine((email) => getValidateEmailDomain(email), { message: 'Email must be of RusselSmith domain!' }),
});

export const authSchema = z.object({
    password: z.string().min(2, 'Password is required'),
    email: z.string()
            .email()
            .refine((email) => getValidateEmailDomain(email), { message: 'Email must be of RusselSmith domain!' }),
});

export const messageSchema = z.object({
    message: z.string().min(10, 'Your message must be at least 10 characters'),
});

export const registerSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string()
            .email()
            .refine((email) => getValidateEmailDomain(email), { message: 'Email must be of RusselSmith domain!' }),
    password: z.string()
                .min(8, { message: "Password must be at least 8 characters long." })
                .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
                .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
                .regex(/[0-9]/, { message: "Password must include at least one digit." })
                .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Password must include at least one special character." }),
    confirm: z.string().min(1, 'Confirm password field is required')
}).refine((data) => data.password === data.confirm, { message: 'Passwords must match', path: ['confirm']});

export type AuthData = z.infer<typeof authSchema>;
export type EmailData = z.infer<typeof emailSchema>;
export type MessageData = z.infer<typeof messageSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
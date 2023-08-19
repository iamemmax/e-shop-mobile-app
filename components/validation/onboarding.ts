import * as yup from 'yup';

export const signupvalidation = yup.object({
    username: yup.string().required(),
    email: yup.string().nullable().email("Invalid email address").required(),
    password: yup.string().required('Password is required'),
    password2: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});

export const Loginvalidation = yup.object({
    email: yup.string().nullable().email("Invalid email address").required(),
    password: yup.string().required('Password is required'),

});

export const Resetvalidation = yup.object({
    email: yup.string().nullable().email("Invalid email address").required(),

});

export const updatePaswwordValidation = yup.object({

    password: yup.string().required('Password is required'),
    password2: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
});
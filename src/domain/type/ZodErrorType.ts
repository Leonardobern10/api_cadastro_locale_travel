export type ZodErrorType = {
     expected: string;
     code: string;
     path: string[];
     message: string;
     minimum?: string | number;
     origin?: 'string' | 'number';
     maximum?: string | number;
};

import { ZodCodeErrorType } from 'domain/type/ZodCodeErrorType';
import { ZodErrorResponseType } from 'domain/type/ZodErrorResponseType';
import { ZodErrorType } from 'domain/type/ZodErrorType';
import { ZodError } from 'zod';

function handleInvalidType(el: ZodErrorType): ZodErrorResponseType {
    return {
        field: el.path[0],
        message: `Tipo recebido <${el.message.trim().split(/\s+/).pop()}> diferente do esperado <${el.expected}>`
    };
}

function handleToSmall(el: ZodErrorType): ZodErrorResponseType {
    if (el.origin === 'number') {
        return {
            field: el.path[0],
            message: `Valor recebido deve ser maior ou igual a ${el.minimum}.`
        };
    } else if (el.origin === 'string') {
        return {
            field: el.path[0],
            message: `String recebida deve ter mais do que < ${el.minimum} > caracteres.`
        };
    }
    return {
        field: el.path[0],
        message: 'Valor muito pequeno.'
    };
}

function handleToBig(el: ZodErrorType): ZodErrorResponseType {
    if (el.origin === 'number') {
        return {
            field: el.path[0],
            message: `Valor recebido deve ser menor ou igual a ${el.maximum}.`
        };
    } else if (el.origin === 'string') {
        return {
            field: el.path[0],
            message: `String recebida deve ter menos do que < ${el.maximum} > caracteres.`
        };
    }
    return {
        field: el.path[0],
        message: 'Valor muito grande.'
    };
}

function handleInvalidFormat(el: ZodErrorType): ZodErrorResponseType {
    return {
        field: el.path[0],
        message: `Formato inválido.`
    };
}

function handleUnknown(): ZodErrorResponseType {
    return {
        field: 'Desconhecido',
        message: 'Erro desconhecido'
    };
}

export default function handleZodError(
    err: ZodError
): Array<ZodErrorResponseType> {
    const issues: Array<ZodErrorType> = err.issues as Array<ZodErrorType>;
    return issues.map((el) => {
        switch (el.code) {
            case ZodCodeErrorType.INVALID_TYPE:
                return handleInvalidType(el);
            case ZodCodeErrorType.TO_SMALL:
                return handleToSmall(el);
            case ZodCodeErrorType.TO_BIG:
                return handleToBig(el);
            case ZodCodeErrorType.INVALID_FORMAT:
                return handleInvalidFormat(el);
            default:
                return handleUnknown();
        }
    });
}

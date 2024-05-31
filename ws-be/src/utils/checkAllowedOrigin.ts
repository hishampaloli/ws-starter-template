const originIsAllowed = (origin: string): boolean => {    
    return true
    return process.env.ALLOWED_ORIGINS === origin;
}

export { originIsAllowed };

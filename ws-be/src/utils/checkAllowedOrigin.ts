const originIsAllowed = (origin: string): boolean => {    
    return process.env.ALLOWED_ORIGINS === origin;
}

export { originIsAllowed };

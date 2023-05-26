export {};

declare global {
    interface String {
        toCapitalizeCase: () => string;
    }
}

String.prototype.toCapitalizeCase = function (this: string) {
    const str = '' + this;
    const strCapital = str.charAt(0).toUpperCase() + str.slice(1);

    return strCapital;
}
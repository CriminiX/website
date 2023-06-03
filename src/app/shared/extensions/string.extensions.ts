export {};

declare global {
    interface String {
        toCapitalizeCase: () => string;
        removeAccents: () => string;
        formatSaintName: () => string;
    }
}

String.prototype.toCapitalizeCase = function (this: string) {
    const str = '' + this;
    const strCapital = str.charAt(0).toUpperCase() + str.slice(1);

    return strCapital;
}

String.prototype.removeAccents = function (this: string) {
    return this.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

String.prototype.formatSaintName = function (this: string) {
    return this
        .replaceAll("sao ", "s.")
        .replaceAll("santo ", "s.")
        .replaceAll("santa ", "s.");
}
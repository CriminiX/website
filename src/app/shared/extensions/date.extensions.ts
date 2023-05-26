import { monthsInYear, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import './string.extensions';

export {};

declare global {
    interface Date {
        getMonthsNames: () => { id: number; name: string; }[];
    }
}

Date.prototype.getMonthsNames = function () {
    const months = [...Array(monthsInYear).keys()];

    return months.map((id) => {
        const d = new Date(this.getFullYear(), id);
        const name = format(d, 'MMMM', {locale: ptBR}).toCapitalizeCase();
        return {id: id + 1, name};
    })
}
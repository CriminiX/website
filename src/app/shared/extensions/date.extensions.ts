import {monthsInYear, format, lastDayOfMonth} from 'date-fns';
import {ptBR} from 'date-fns/locale';
import './string.extensions';

export {};

declare global {
    interface Date {
        getMonthsNames: () => { id: number; name: string; }[];
        getFirstDayOfMonth: (month: number) => string;
        getLastDayOfMonth: (month: number) => string;
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

Date.prototype.getFirstDayOfMonth = function (month: number) {
    const d = new Date(this.getFullYear(), month - 1, 1);

    return format(d, 'yyyy-MM-dd', {locale: ptBR})
}

Date.prototype.getLastDayOfMonth = function (month: number) {
    const d = new Date(this.getFullYear(), month - 1, 1);

    const dl = lastDayOfMonth(d);

    return format(dl, 'yyyy-MM-dd', {locale: ptBR})
}
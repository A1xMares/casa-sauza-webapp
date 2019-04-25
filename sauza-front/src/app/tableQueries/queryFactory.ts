// ----------------------------------------------------//
// This class helps to generate web requests to server //
// ----------------------------------------------------//
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QueryFactory  {
    // -------------------------------------------//
    // This method generate a search query object //
    // -------------------------------------------//
    public setSearchQuery(dataSearch: string, properties: string[]) {
        if (dataSearch) {
            const orObject = [];
            for (const property of properties) {
                orObject.push({
                    [property]: {
                        like: '.*' + dataSearch + '.*',
                        options: 'i'
                    }
                });
            }
            return { or: orObject };
        }
        return {};
    }
    // -----------------------------------------//
    // This method generate one sorter property //
    // -----------------------------------------//
    public setSorterProperty(sort: any) {
        if (sort) {
            if (sort.active && sort.direction) {
                return sort.active + ' ' + sort.direction.toUpperCase();
            }
            return 'createdAt DESC';
        }
        return 'createdAt DESC';
    }
    // -----------------------------------//
    // This method generate a GET request //
    // -----------------------------------//
    public generateGetQuery(model: string, whereObject: any, limit: number, skip: number, order: string, include: any[]) {
        return model + '?filter=' + JSON.stringify({
            where: whereObject,
            limit: limit,
            skip: skip,
            order: order,
            include: include
        });
    }
    // ----------------------------------------------------------//
    // This method generate a GET request for calendar component //
    // ----------------------------------------------------------//
    public getCalendarQuery(model: string, startDate: string, endDate: string, searchObject) {
        return model + '?filter=' + JSON.stringify({
            where: {
                or: [
                    {from: {between: [startDate, endDate]}},
                    {to: {between: [startDate, endDate]}}
                ]
            },
            include: 'appUser'
        });
    }
    // ------------------------------------------------------//
    // This method generate GET/COUNT request //
    // ------------------------------------------------------//
    public generateGetCountQuery(model: string, whereObject: any) {
        return model + '/count?where=' + JSON.stringify(whereObject);
    }
}

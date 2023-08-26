export interface LocationsSearchResult {
    records: LocationsSearchRecordsResult[];
}

export interface LocationsSearchRecordsResult {
    city?: string;
    neighborhood?: string;
    zip_code?: string;
}
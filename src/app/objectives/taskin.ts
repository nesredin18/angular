export interface Taskin {
    id: number;
    ob_Name: string;
    ob_Description: string;
    initial_date: Date ;
    final_date: Date ;
    status: string;
    goal: number;
    result: number;
    terms: any[];
}
export interface objective{
    $id: string;
    $values: Taskin[];
}


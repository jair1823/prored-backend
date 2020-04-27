import { QueryResult, PoolClient } from 'pg';

class Queries {

    /**
     * 
     */
    async simpleSelect(query: string, fetch: string, client: PoolClient): Promise<QueryResult> {
        await client.query('BEGIN');
        await client.query(query);
        const response: QueryResult = await client.query(fetch);
        await client.query('ROLLBACK');
        client.release();
        return response;
    }

    /**
     * 
     */
    async simpleSelectNoCursor(query: string, values: any, client: PoolClient): Promise<QueryResult> {
        await client.query('BEGIN');
        const response: QueryResult = await client.query(query,values);
        await client.query('ROLLBACK');
        client.release();
        return response;
    }

    /**
     * 
     */
    async simpleSelectWithParameter(query: string, values: any, fetch: string, client: PoolClient) {
        await client.query('BEGIN');
        await client.query(query, values);
        const response: QueryResult = await client.query(fetch);
        await client.query('ROLLBACK');
        client.release();
        return response;
    }

        /**
     * 
     */
    async simpleSelectWithParameterContinous(query: string, values: any, fetch: string, client: PoolClient) {
        await client.query('BEGIN');
        await client.query(query, values);
        const response: QueryResult = await client.query(fetch);
        await client.query('ROLLBACK');
        return response;
    }

    /**
     * 
     */
    async  simpleTransaction(query: string, values: any, client: PoolClient) {
        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
        client.release();
    }

    async  simpleTransactionContinous(query: string, values: any, client: PoolClient) {
        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
    }

    /**
     * 
     */
    async  simpleError(client: PoolClient, error: any) {
        await client.query('ROLLBACK');
        client.release();
        console.log(error);
    }
}

const queries = new Queries();

export default queries;





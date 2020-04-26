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

    async simpleSelectById(query: string, values: any, fetch: string, client: PoolClient) {
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
    async  simpleTransaction(query: string, values: any, client: PoolClient) {
        await client.query('BEGIN');
        await client.query(query, values);
        await client.query('COMMIT');
        client.release();
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





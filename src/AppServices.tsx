import firebase from './Firebase'
import Address, { EntityBase } from './Models/Address';

export class WhereClause {
    constructor(fieldPath: string, opStr:firebase.firestore.WhereFilterOp, value: string) {       
        this.fieldPath = fieldPath;
        this.opStr  = opStr;
        this.value = value;
    }

    fieldPath: string = '';
    opStr: firebase.firestore.WhereFilterOp = '==';
    value: string = '';        
}

class AppServices<T extends EntityBase> {

    create(item: T, collectionName: string): Promise<void> {
        return firebase
            .firestore()
            .collection(collectionName)
            .doc(item.ID)
            .set(item);        
    }

    get(id: string, collectionName: string): Promise<firebase.firestore.DocumentSnapshot> {
        return firebase
            .firestore()
            .collection(collectionName)
            .doc(id)
            .get();
    }

    update(doc: T, collectionName: string): Promise<void> {
        return firebase
            .firestore()
            .collection(collectionName)
            .doc(doc.ID)
            .update(doc,);
    }

    delete(docId: string, collectionName: string): Promise<void> {
        return firebase
            .firestore()
            .collection(collectionName)
            .doc(docId)
            .delete();
    }

    query(collectionName: string,
        predicate: WhereClause,
        limit: number | null = null
    ): firebase.firestore.Query {

        let query = firebase
            .firestore()
            .collection(collectionName)
            .where(predicate.fieldPath, predicate.opStr, predicate.value);

        if (limit) query = query.limit(limit);

        return query;
    }

    compoundQuery(collectionName: string,
        predicates: WhereClause [],
        limit: number | null = null
    ): firebase.firestore.Query {

        let collectionRef = firebase
            .firestore()
            .collection(collectionName);

        let query: any;

        for (let index = 0; index < predicates.length; index++) {
            const predicate = predicates[index];
            if(index === 0){
                query = collectionRef.where(predicate.fieldPath, predicate.opStr, predicate.value);
            }
            else if(query) {
                query = query.where(predicate.fieldPath, predicate.opStr, predicate.value);
            }
        }        

        if (limit) query = query.limit(limit);
        return query;
    }

}

export const AddressProvider = new AppServices<Address>();

import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  documentId,
  query,
  startAfter,
  orderBy,
  limit,
  where,
  doc,
  deleteDoc,
  updateDoc,
  increment,
  runTransaction,
} from 'firebase/firestore';
import moment from 'moment';
import { auth, db } from './firebaseInitializer';

const today = moment();
// prettier-ignore
const shiftOpenTime = moment().set({
  'year': today.year(),
  'month': today.month(),
  'date': today.date(),
  'hour': 10,
  'minute': 0,
  'second': 0,
});

export class Firebase {
  // AUTHENTICATION
  signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  getUser = async (id: string) => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);

    return docSnap;
  };

  // GET DATA FOR SALE
  getProducts = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const productsCol = await collection(db, 'products');
            const productsQuery = query(
              productsCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(productsQuery);

            const products: Array<any> = [];
            snapshot.forEach((doc: any) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch products.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const productsCol = await collection(db, 'products');
            const productsQuery = query(
              productsCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(productsQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const products: Array<any> = [];
              snapshot.forEach((doc: any) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch products.');
          }
        }
      })();
    });
  };

  getCategories = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const categoriesCol = await collection(db, 'categories');
            const categoriesQuery = query(
              categoriesCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(categoriesQuery);

            const categories: Array<any> = [];
            snapshot.forEach((doc: any) =>
              categories.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ categories, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch categories.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const categoriesCol = await collection(db, 'categories');
            const categoriesQuery = query(
              categoriesCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(categoriesQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const categories: Array<any> = [];
              snapshot.forEach((doc: any) =>
                categories.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ categories, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch categories.');
          }
        }
      })();
    });
  };

  getSuppliers = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const suppliersCol = await collection(db, 'suppliers');
            const suppliersQuery = query(
              suppliersCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(suppliersQuery);

            const suppliers: Array<any> = [];
            snapshot.forEach((doc: any) =>
              suppliers.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ suppliers, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch suppliers.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const suppliersCol = await collection(db, 'suppliers');
            const suppliersQuery = query(
              suppliersCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(suppliersQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const suppliers: Array<any> = [];
              snapshot.forEach((doc: any) =>
                suppliers.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ suppliers, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch suppliers.');
          }
        }
      })();
    });
  };

  getCollections = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const collectionsCol = await collection(db, 'collections');
            const collectionsQuery = query(
              collectionsCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(collectionsQuery);

            const collections: Array<any> = [];
            snapshot.forEach((doc: any) =>
              collections.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ collections, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch collections.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const collectionsCol = await collection(db, 'collections');
            const collectionsQuery = query(
              collectionsCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(collectionsQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const collections: Array<any> = [];
              snapshot.forEach((doc: any) =>
                collections.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ collections, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch collections.');
          }
        }
      })();
    });
  };

  getVariants = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const variantsCol = await collection(db, 'variantsgroup');
            const variantsQuery = query(
              variantsCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(variantsQuery);

            const variants: Array<any> = [];
            snapshot.forEach((doc: any) =>
              variants.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ variants, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch variants.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const variantsCol = await collection(db, 'variantsgroup');
            const variantsQuery = query(
              variantsCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(variantsQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const variants: Array<any> = [];

              snapshot.forEach((doc: any) =>
                variants.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ variants, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch variants.');
          }
        }
      })();
    });
  };

  getPromotions = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const promotionsCol = await collection(db, 'promotions');
            const promotionsQuery = query(
              promotionsCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(promotionsQuery);

            const promotions: Array<any> = [];
            snapshot.forEach((doc: any) =>
              promotions.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ promotions, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch promotions.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const promotionsCol = await collection(db, 'promotions');
            const promotionsQuery = query(
              promotionsCol,
              orderBy(documentId()),
              limit(12)
            );
            const snapshot = await getDocs(promotionsQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const promotions: Array<any> = [];
              snapshot.forEach((doc: any) =>
                promotions.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ promotions, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch promotions.');
          }
        }
      })();
    });
  };

  getBills = (lastRefKey?: any) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const billsCol = await collection(db, 'bills');
            const billsQuery = query(
              billsCol,
              orderBy(documentId()),
              startAfter(lastRefKey),
              limit(12)
            );
            const snapshot = await getDocs(billsQuery);

            const bills: Array<any> = [];
            snapshot.forEach((doc: any) =>
              bills.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ bills, lastKey });
          } catch (e: any) {
            reject(e?.message || ':( Failed to fetch bills.');
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error('Request timeout, please try again'));
          }, 15000);

          try {
            const billsCol = await collection(db, 'bills');
            const billsQuery = query(
              billsCol,
              where(
                'dateAdded',
                '>=',
                new Date('2023-03-12 10:00:00').getTime()
              ),
              orderBy('dateAdded'),
              limit(12)
            );
            const snapshot = await getDocs(billsQuery);
            // @ts-ignore
            const total = snapshot.length;

            clearTimeout(timeout);
            if (!didTimeout) {
              const bills: Array<any> = [];
              snapshot.forEach((doc: any) =>
                bills.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ bills, lastKey, total });
            }
          } catch (e: any) {
            if (didTimeout) return;
            reject(e?.message || ':( Failed to fetch bills.');
          }
        }
      })();
    });
  };

  // SAVE BILL
  generateBillKey = () => doc(collection(db, 'bills'));

  getLastBill = async () => {
    const billsCol = await collection(db, 'bills');
    const billQuery = query(billsCol, orderBy('dateAdded', 'desc'), limit(1));
    const snapshot = await getDocs(billQuery);

    const bills: Array<any> = [];
    snapshot.forEach((doc: any) => bills.push({ id: doc.id, ...doc.data() }));
    const lastKey = snapshot.docs[snapshot.docs.length - 1];
    // @ts-ignore
    const total = snapshot.length;

    return { lastBill: bills[0], lastKey, total };
  };

  generatePaymentMethodKey = () => doc(collection(db, 'paymentMethods'));

  addBill = (id: any, bill: any) => setDoc(id, bill);

  getSingleProduct = async (id: string) => {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);

    return docSnap;
  };

  editProductQuantity = async (id: string, product: any) => {
    const docRef = doc(db, 'products', id);

    const concernedProdut = await this.getSingleProduct(id);
    const data = { ...concernedProdut.data(), id: concernedProdut.ref.id };

    let newVariants = [];

    console.log({ dataaaaaaaaa: data });

    if (data?.stock?.variantsQuantities) {
      if (product?.variant?.variantGroupId) {
        newVariants = data?.stock?.variantsQuantities.map((e) => {
          if (e.variantName === product?.variant?.variant) {
            return {
              ...e,
              quantity: e.quantity + product.quantity * -1,
            };
          }
          return e;
        });
      }
    }

    console.log({ newVariants });

    // Atomically increment the totalQuantity
    await updateDoc(docRef, {
      'stock.totalQuantity': increment(product.quantity * -1),
      'stock.variantsQuantities': newVariants,
    });
  };
}

const firebaseInstance = new Firebase();

export default firebaseInstance;

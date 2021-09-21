import * as repo from "./ctlRepositorioBase";
import { log } from "./firebase";

var listarTodos = async () => {
    return await log.orderBy("data", "desc").get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        });
}

export {
    listarTodos
}
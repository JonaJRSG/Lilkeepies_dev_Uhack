import type { NextPage } from "next";
import React from "react";
import { load } from "../src/funcs";
import { useRouter } from "next/router";
import styles from "./styles.module.css"

const Home: NextPage = () => {
  const router = useRouter(); // Invoca la función useRouter para obtener el router

  const [input, setInput] = React.useState<string>("");
  const [refresh, setRefresh] = React.useState<boolean>(true);
  const [addressAccount, setAddresAccount] = React.useState<any>(null);
  const [contract, setContract] = React.useState<any>(null);
  const [child, setChild] = React.useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // React useEffect

  React.useEffect(() => {
    if (!refresh) return;
    setRefresh(false);
    load().then((e) => {
      console.log(e.addressAccount)
      setAddresAccount(e.addressAccount);
      setChild(e.childs);
      setContract(e.LilContract);
    });
  }, [refresh]); // Agrega refresh como dependencia del useEffect para evitar ejecuciones innecesarias

  return (
    <div>
      <div className={styles.menu}>
        <button className={styles.btnAdd}>Agregar</button>
      </div>
      <div className={styles.container}>
        {
          child == null || child.length === 0 ? <p className={styles.empty}>No hay nada</p> :
          child.map((ch, id) => {
            return(
              <div className={styles.ch} key={id}>
                <h2 className={styles.name}>{ch.name}</h2>
                <p className="info">Fecha de nacimiento: {ch.DOB.words[0]}</p>
                <p className="info">Altura: {ch.Weight.words[0]}</p>
                <p className="info">Peso: {ch.Height.words[0]}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Home;

import { router } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";



const Home = () => {
      useEffect(() => {
  }, []);

    
    return (
    <View style={{alignItems: "center"}}>
    <Text style={{padding:20,fontSize:30,textAlign:"center"}}>Velkomin/n í Fatakskápa appið mitt :)</Text>

    <TouchableOpacity onPress={() => router.push("/Forsida")}>
        <Text style={{fontSize:30,padding:30,color:"blue"}}>Opna appið -></Text>
    </TouchableOpacity>
    
<View style={{padding:20}}>
    <Text style={{textAlign:"center", margin:20}}>Eða lestu stutta útskýringu um virkni appsins ;)</Text>
    <Text>Í byrjun er appið tómt því það ert þú sem á að fylla það. </Text>
    <Text>Fyrsta sem þú þarft er að taka góða sjálfmynd sem þú svo setur inn sem Módel</Text>
    <Text>Næst opnarðu fataskápinn þinn og bætir inn þeim fötum sem þú vilt máta. 
  Það eru fjórar flokkaðar tegundir sem þú getur hlaðið inn: 
  húfur, treyjur/bolir/úlpur, buxur og skór.</Text>
    <Text>*Eftir að þú bætir inn fötum þarf að endurræsa appið 
  svo þær birtist rétt og notaðu bara myndir með engum bakgrunni fyrir bestan útlit.*</Text>
    <Text>Að lokum er bara að nota ímyndunaraflið og búa til stílhrein outfit úr 
  þínum eigin fötum :)</Text>
</View>
</View>

    );
};

export default Home

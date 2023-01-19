import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";


export default function Pay_site({navigation}) {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" hidden={false} backgroundColor="#fff" translucent={false}/>
            <View style={{flex: 1, height: 100, width: "90%"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()} >
                    <Image
                        style={{ width: 24, height: 24}}
                        source={require("../assets/back.png")}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{fontSize: 25, fontWeight: "bold", color: "#000", top: 25}}>دفع عمولة الموقع</Text>
            <View style={{height: 1, width: "100%", backgroundColor: "gray", marginTop: 30, opacity: 0.3}}></View>
            <Text style={{fontSize: 20, fontWeight: "bold", color: "#000", width: "90%", lineHeight: 30, marginTop: 20}}>هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "هنا يوجد محتوى نصي، هنا يوجد محتوى نصي" فتجعلها تبدو (أي الأحرف) وكأنها نص مقروء. العديد من برامح النشر المكتبي وبرامح تحرير صفحات الويب تستخدم لوريم إيبسوم بشكل إفتراضي كنموذج عن النص، وإذا قمت بإدخال "lorem ipsum" في أي محرك بحث ستظهر العديد من المواقع الحديثة العهد في نتائج البحث. على مدى السنين ظهرت نسخ جديدة ومختلفة من نص لوريم إيبسوم، أحياناً عن طريق الصدفة، وأحياناً عن عمد كإدخال بعض العبارات الفكاهية إليها.</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        width: 45,
        height: 37,
        backgroundColor: '#f1f1f1',
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
})
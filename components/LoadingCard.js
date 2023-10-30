import { View, StyleSheet } from "react-native";


export default function LoadingCard() {
    return (
        <View style={styles.cardContainer}>
            <View style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                width: 300,
                height: 300,
                paddingVertical: 24,
                paddingHorizontal: 40,
            }}>
                <View style={{ alignSelf: 'flex-start' }}>
                    <View style={[styles.loadingBox, {
                        width: 120,
                        height: 40,
                    }]} />
                    <View style={[styles.loadingBox, {
                        width: 180,
                        height: 20,
                        marginVertical: 10,

                    }]} />
                </View>
                <View style={[styles.flexRow, { alignItems: 'center' }]}>
                    <View style={[styles.loadingBox, {
                        width: 130,
                        height: 48,
                    }]} />
                    <View style={[styles.loadingBox, {
                        alignSelf: 'baseline',
                        width: 24,
                        height: 24,
                        marginHorizontal: 8
                    }]} />
                    <View style={[styles.loadingBox,
                    {
                        width: 50,
                        height: 50,
                        borderRadius: 50
                    }]} />
                </View>
                <View style={[styles.flexRow, { gap: 16 }]}>
                    <View style={[styles.loadingBox, {
                        width: 100,
                        height: 40,
                    }]} />
                    <View style={[styles.loadingBox, {
                        width: 100,
                        height: 40,
                    }]} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        width: 300,
        height: 320,
        paddingHorizontal: 24,
        gap: 20,

        backgroundColor: '#ffffff',
        shadowColor: '#292F36',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    loadingBox: {
        backgroundColor: '#D1E9F0'
    }
});

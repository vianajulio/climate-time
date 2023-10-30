import { Pressable, StyleSheet, View, Text } from "react-native";

export default function CustomButton({ label, onPress, disable = false }) {
    return (
        <View style={disable ? [styles.container, { backgroundColor: '#F5F5F5', }]
            : [styles.container, { backgroundColor: '#292F36' }]}>
            <Pressable onPress={onPress} disabled={disable}>
                <Text style={disable ? styles.disablebuttonLabel
                    : styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
        height: 40,
        margin: 32,
        borderRadius: 24,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
    },
    buttonLabel: {
        color: '#F5F5F5',
        fontSize: 16,
    },
    disablebuttonLabel: {
        color: '#292F36',
        fontSize: 16,
    }
});
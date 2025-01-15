import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image
} from "react-native";
import { useState } from 'react';

// Add these type definitions at the top of your file
interface ProblemState {
    problem1: string;
    problem2: string;
    problem3: string;
}

type ProblemId = keyof ProblemState;

interface StyleProps {
    [key: string]: {
        backgroundColor?: string;
        borderWidth?: number;
        borderColor?: string;
        color?: string;
        fontSize?: number;
        fontFamily?: string;
        textAlign?: 'center';
        marginTop?: number;
    }
}

export default function Material() {
    const [selectedAnswers, setSelectedAnswers] = useState<ProblemState>({
        problem1: '',
        problem2: '',
        problem3: ''
    });
    
    const [checkStatus, setCheckStatus] = useState<ProblemState>({
        problem1: '',
        problem2: '',
        problem3: ''
    });

    const correctAnswers: ProblemState = {
        problem1: 'Doubles',
        problem2: '124,710 Pa',
        problem3: '116,396 Pa'
    };

    // Update handler types
    const handleSelectAnswer = (problemId: ProblemId, answer: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [problemId]: answer
        }));
    };

    const checkAnswers = () => {
        const newCheckStatus: ProblemState = {
            problem1: selectedAnswers.problem1 === correctAnswers.problem1 ? 'correct' : 'incorrect',
            problem2: selectedAnswers.problem2 === correctAnswers.problem2 ? 'correct' : 'incorrect',
            problem3: selectedAnswers.problem3 === correctAnswers.problem3 ? 'correct' : 'incorrect'
        };
        setCheckStatus(newCheckStatus);
    };

    const getOptionStyle = (problemId: ProblemId, option: string) => {
        const isSelected = selectedAnswers[problemId] === option;
        const isChecked = checkStatus[problemId] !== '';
        
        if (!isChecked) {
            return [
                styles.optionButton,
                isSelected && styles.selectedOption
            ];
        }

        if (isSelected) {
            return [
                styles.optionButton,
                checkStatus[problemId] === 'correct' ? styles.correctOption : styles.incorrectOption
            ];
        }

        return [styles.optionButton];
    };

    const getOptionTextStyle = (problemId: ProblemId, option: string) => {
        const isSelected = selectedAnswers[problemId] === option;
        const isChecked = checkStatus[problemId] !== '';
        
        if (isSelected && isChecked) {
            return [styles.optionText, styles.optionTextSelected];
        }
        
        return [styles.optionText];
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.headerContainer}>
                <View style={styles.headerContent}>
                <Image
                    source={require("../../assets/images/icon.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>PhysiLab</Text>
                </View>
            </View>
          <Text style={styles.title}>Thermodynamics Virtual Lab Material</Text>
          
          {/* Ideal Gas Law Card */}
        <Image
            source={require("../../assets/images/rumus.png")}
            style={styles.equationImage}
        />
  
          {/* Description Card */}
          <View style={[styles.card, styles.orangeCard]}>
            <Text style={styles.descriptionText}>
              Thermodynamics is a branch of physics that deals with the relationships between heat and other forms of energy. In thermodynamics, we study how a system's temperature, volume, pressure and mass affect each other. One of the fundamental equations in thermodynamics is the Ideal Gas Law. The Ideal Gas Law describes the relationship between the various gas parameters (P, V, temperature T) and amount of substance (n).
            </Text>
            <Text style={styles.descriptionText}>
              This law helps us understand how gases behave under different conditions, including changes in temperature. It is particularly useful for performing calculations in chemistry and physics, such as in laboratory experiments or industrial processes.
            </Text>
          </View>
  
          <Text style={styles.sectionTitle}>Example Problems</Text>
                
                {/* Problem 1 */}
                <View style={styles.problemCard}>
                    <Text style={styles.problemText}>
                        If the temperature of an ideal gas increases from 300 K to 600 K while keeping the volume constant, what happens to the pressure?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['Doubles', 'Same', 'Decreases', 'Increases'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={getOptionStyle('problem1', option)}
                                onPress={() => handleSelectAnswer('problem1', option)}
                            >
                                <Text style={getOptionTextStyle('problem1', option)}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {checkStatus.problem1 && (
                        <Text style={[
                            styles.resultText,
                            checkStatus.problem1 === 'correct' ? styles.correctText : styles.incorrectText
                        ]}>
                            {checkStatus.problem1 === 'correct' ? 'Correct!' : 'Incorrect!'}
                        </Text>
                    )}
                </View>

                {/* Problem 2 */}
                <View style={styles.problemCard}>
                    <Text style={styles.problemText}>
                        A sealed container holds 1.5 moles of an ideal gas at a volume of 0.03 m³ and a temperature of 300 K. What is the pressure of the gas inside the container in Pascals (Pa)?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['123,210 Pa', '124,710 Pa', '121,470 Pa', '122,210 Pa'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={getOptionStyle('problem2', option)}
                                onPress={() => handleSelectAnswer('problem2', option)}
                            >
                                <Text style={getOptionTextStyle('problem2', option)}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {checkStatus.problem2 && (
                        <Text style={[
                            styles.resultText,
                            checkStatus.problem2 === 'correct' ? styles.correctText : styles.incorrectText
                        ]}>
                            {checkStatus.problem2 === 'correct' ? 'Correct!' : 'Incorrect!'}
                        </Text>
                    )}
                </View>

                {/* Problem 3 */}
                <View style={styles.problemCard}>
                    <Text style={styles.problemText}>
                        An ideal gas is contained in a 0.05 m³ container, with 2 moles of gas at a temperature of 350 K. What is the pressure of the gas inside the container in Pascals (Pa)?
                    </Text>
                    <View style={styles.optionsContainer}>
                        {['116,396 Pa', '115,396 Pa', '117,498 Pa', '118,650 Pa'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={getOptionStyle('problem3', option)}
                                onPress={() => handleSelectAnswer('problem3', option)}
                            >
                                <Text style={getOptionTextStyle('problem3', option)}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {checkStatus.problem3 && (
                        <Text style={[
                            styles.resultText,
                            checkStatus.problem3 === 'correct' ? styles.correctText : styles.incorrectText
                        ]}>
                            {checkStatus.problem3 === 'correct' ? 'Correct!' : 'Incorrect!'}
                        </Text>
                    )}
                </View>

                <TouchableOpacity style={styles.checkButton} onPress={checkAnswers}>
                    <Text style={styles.checkButtonText}>Check your answer</Text>
                </TouchableOpacity>
            </ScrollView>
            
            {/* Navigation Bar remains the same... */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    position: "absolute",
    top: 40,
    left: 5,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: "#87bba2",
    marginLeft: 8,
  },
  logo: {
    width: 42,
    height: 42,
    tintColor: "#87bba2",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#FF8C00",
    marginBottom: 10,
    marginTop: 120,
    textAlign: "center"
  },
  card: {
    backgroundColor: "#F5F6FA",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#2D3436",
    marginBottom: 10,
  },
  equationImage: {
    width: "100%", // Tetap penuh lebar
    height: 200,   // Tinggi dinaikkan dari 100 ke 200
    resizeMode: "contain",
    marginVertical: 10,
  },
  orangeCard: {
    backgroundColor: "#FF8C00",
    marginVertical: 20,
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    color: "#FFFFFF",
    marginBottom: 10,
    lineHeight: 20,
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#2D3436",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center"
  },
  problemCard: {
    backgroundColor: "#FF8C00",
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  problemText: {
    fontSize: 13,
    fontFamily: "Montserrat-Bold",
    color: "#FFFFFF",
    marginBottom: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 15,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 130,
    alignItems: "center",
  },
  optionText: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    color: "#000000",
  },
  correctOptionText: {
    color: "#FFFFFF",
  },
  checkButton: {
    backgroundColor: "#FF8C00",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
    marginVertical: 5,
  },
  checkButtonText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#FFFFFF",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#004D40",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
    marginBottom: 4,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
  },
selectedOption: {
    backgroundColor: '#FFB74D',
    borderWidth: 2,
    borderColor: '#FF8C00',
},
correctOption: {
    backgroundColor: '#87bba2',
},
incorrectOption: {
    backgroundColor: '#FF6B6B',
},
optionTextSelected: {
    color: '#FFFFFF',
},
resultText: {
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
},
correctText: {
    color: '#87bba2',
},
incorrectText: {
    color: '#FF6B6B',
}
});

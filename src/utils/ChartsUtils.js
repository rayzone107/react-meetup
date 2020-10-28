import React from "react";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export function calculateAgeData(registrations) {
    var age13_minus = 0
    var age13_18 = 0
    var age18_25 = 0
    var age25_plus = 0
    registrations.map(person => {
        if (person.age < 13) {
            age13_minus += 1;
        } else if (person.age >= 13 && person.age < 18) {
            age13_18 += 1;
        } else if (person.age >= 18 && person.age < 25) {
            age18_25 += 1;
        } else {
            age25_plus += 1;
        }
    });

    return [
        {
            name: "Age < 13",
            count: age13_minus,
            color: "#fdab65",
            legendFontColor: "#000000",
            legendFontSize: 14
        },
        {
            name: "Age: 13-18",
            count: age13_18,
            color: "#9ebae2",
            legendFontColor: "#000000",
            legendFontSize: 14
        },
        {
            name: "Age: 18-25",
            count: age18_25,
            color: "#279221",
            legendFontColor: "#000000",
            legendFontSize: 14
        },
        {
            name: "Age > 25",
            count: age25_plus,
            color: "#f86910",
            legendFontColor: "#000000",
            legendFontSize: 14
        }
    ];
}

export function getAgeChart(data) {
    return <PieChart
        data={data}
        width={screenWidth - 30}
        accessor="count"
        height={200}
        absolute
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={{
            borderRadius: 12
        }} />;
}

export function calculateLocalityData(registrations) {
    const localities = registrations
        .map(person => person.locality)
        .filter((locality, index, array) => array.indexOf(locality) === index)

    var localityGroups = localities
        .map(locality => ({
            type: locality,
            count: registrations.filter(item => item.locality === locality).length
        }));

    var labels = [];
    var dataVals = [];

    localityGroups.map(localityGroup => {
        labels.push(localityGroup.type)
        dataVals.push(localityGroup.count)
    });
    return {
        labels: labels,
        datasets: [
            {
                data: dataVals
            }
        ],
    };
}

export function getLocalityChart(data) {
    return <BarChart
        data={data}
        width={screenWidth - 30}
        height={220}
        fromZero
        showValuesOnTopOfBars
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#f47438",
            backgroundGradientTo: "#faa267",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16,
            },
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
    />;
}

export function calculateProfessionData(registrations) {
    const professions = registrations
        .map(person => person.profession)
        .filter((profession, index, array) => array.indexOf(profession) === index)

    var professionSegments = professions
        .map(profession => ({
            type: profession,
            count: registrations.filter(item => item.profession === profession).length
        }));

    var labels = [];
    var dataVals = [];

    professionSegments.map(profession => {
        labels.push(profession.type)
        dataVals.push(profession.count)
    });
    return {
        labels: labels,
        datasets: [
            {
                data: dataVals,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }
        ],
    };
}

export function getProfessionChart(data) {
    return <LineChart
        data={data}
        width={screenWidth - 30}
        height={220}
        fromZero
        chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#0C7BB3",
            backgroundGradientTo: "#F2BaE8",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
                borderRadius: 16,
            },
        }}
        style={{
            marginVertical: 8,
            borderRadius: 16
        }}
    />;
}
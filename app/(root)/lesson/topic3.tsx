/* eslint-disable react/no-unknown-property */
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
  } from "react-native";
  import React, { Suspense, useEffect, useState } from "react";
  import { Stack } from "expo-router";
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "@/config/FirebaseConfig";
  import Modal from "@/components/Modal";
  import Prokaryotes from "@/components/Prokaryotes";
  import { Canvas } from "@react-three/fiber";
  import useControls from "r3f-native-orbitcontrols";
  import Diploccoci from "@/components/Diplococci";
  import Stretococci from "@/components/Stretococci";
  import Telrad from "@/components/Telrad";
  import Garcinae from "@/components/Garcinae";
  import Staphylococci from "@/components/Staphylococci";
  import SingleBacillus from "@/components/SingleBacillus";
  import Diplobacilli from "@/components/Diplobacilli";
  import Streptobacilli from "@/components/Streptobacilli";
  import Coccobacillus from "@/components/Coccobacillus";
  
  const Topic3 = () => {
    const [OrbitControls, events] = useControls();
    const [OrbitControls1, events1] = useControls();
    const [OrbitControls2, events2] = useControls();
    const [OrbitControls3, events3] = useControls();
    const [OrbitControls4, events4] = useControls();
    const [OrbitControls5, events5] = useControls();
    const [OrbitControls6, events6] = useControls();
    const [OrbitControls7, events7] = useControls();
    const [OrbitControls8, events8] = useControls();
    const [OrbitControls9, events9] = useControls();
    const [OrbitControls10, events10] = useControls();
    const id = "kEdK6qz0jBR9a6DE3x2G";
    const [pageLoaded, setIsPageLoaded] = useState(false);
    const [topic, setTopic] = useState<{
      name: string;
      id: string;
      objective: string;
    } | null>(null);
  
    useEffect(() => {
      const fetchTopics = async () => {
        try {
          const topicDocRef = doc(db, "Topics", id as string);
          const topicDoc = await getDoc(topicDocRef);
          if (topicDoc.exists()) {
            setTopic({
              id: topicDoc.id,
              name: topicDoc.data().name,
              objective: topicDoc.data().objective,
            });
            setIsPageLoaded(true);
          } else {
            console.log("No such topic!");
          }
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };
  
      fetchTopics();
    }, [id]);
    return (
      <>
        <Modal isOpen={pageLoaded}>
          <View className="rounded-md bg-[#d4e1b5] border-2 border-[#5c6d1d] p-5">
            <Text className="text-lg font-bold">Objectives:</Text>
            <Text className="text-md mb-3">{topic?.objective}</Text>
            <TouchableOpacity
              className="px-5 bg-primary py-2 rounded-md"
              onPress={() => setIsPageLoaded(false)}
            >
              <Text className="text-white text-center">Proceed</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Stack.Screen
          options={{
            title: topic?.name || "Micro-Learn Hub",
            headerStyle: {
              backgroundColor: "#5e7119",
            },
            headerTintColor: "#fff",
          }}
        />
        <ImageBackground
          source={require("@/assets/images/BG.png")}
          style={{ flex: 1 }}
        >
          <ScrollView className="flex-1 px-5 py-5">
            <View>
              <Text className="font-bold text-lg">MICROBIOLOGY:</Text>
              <Text className="text-xs text-zinc-700">
                Microbiology is the study of tiny creatures that can't be seen by
                the naked eye also known as microorganisms. It is composed of
                bacteria, protozoa, fungi, algae, as well as viruses. When it
                comes to the environmental aspect. It balances ecological aspects
                particularly in marine and freshwater environments. Microbes from
                the soil recycle the relevant elements through breaking down
                waste. Microbes are also used in products such as acetone and
                butanol, it was discovered by Chaim Weizmann. It was also used in
                making cordite or smokeless gunpowder during world war 1. While in
                the food industry microbes are associated with vinegar, cheese,
                soy sauce, yogurt and more. They are also used for producing
                genetically manipulated product such as cellulose, human insulin
                and proteins for vaccines.
              </Text>
              <Text className="font-bold mt-3 text-lg">CELLULAR CELLS:</Text>
              <Text>
                Prokaryotes - a unicellular organism which consists of bacteria
                and archaea.
              </Text>
              <View className="flex-1 h-96" {...events}>
                <Canvas>
                  <OrbitControls enablePan={true} enableRotate enableZoom />
                  <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                  <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                  <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                  <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                  <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                  <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                  <Suspense fallback={null}>
                    <Prokaryotes />
                  </Suspense>
                </Canvas>
              </View>
              <Text className="font-bold -mt-20 text-lg">Bacteria:</Text>
              <Text>
                Size = 0.2- 2.0 µm (micrometers) in diameter. 2 - 8 µm in length
              </Text>
              <Text>
                Shape = spherical-shaped coccus (e.g. berries) , rod-shaped
                bacillus (e.g. walking sticks) , and spiral.
              </Text>
              <Text className="mt-3">a. Diploccoci</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[200px]" {...events1}>
                  <Canvas>
                    <OrbitControls1 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Diploccoci />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/diplococci.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="mt-3">b. Stretococci</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[200px]" {...events2}>
                  <Canvas>
                    <OrbitControls2 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Stretococci />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/stretococci.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="mt-3">c. Telrad</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[200px]" {...events3}>
                  <Canvas>
                    <OrbitControls3 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Telrad />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="mt-3">d. Garcinae</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[200px]" {...events4}>
                  <Canvas>
                    <OrbitControls4 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Garcinae />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="mt-3">e. Staphylococci</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[200px]" {...events5}>
                  <Canvas>
                    <OrbitControls5 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Staphylococci />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="font-bold -mt-20 text-lg">Cocci:</Text>
              <Text>
                - are round in shape and can be oval, elongated or flattened to a
                side.
              </Text>
              <Text>
                - if it divides to reproduce the cells remain attached to one
                another.
              </Text>
              <Text className="mt-3">
                a. The division between one plane on the figure produces
                diplococci (remain in pairs after dividing) and streptococci
                (divide and remain like a chain pattern).
              </Text>
              <Text>
                b. If there are two planes it produces tetrads (divide in 2 planes
                and remain as a group in 4)
              </Text>
              <Text>
                c. If there are three divisions in the planes it produces sarcinae
                (divide in 3 planes remain as a group in 8 and a cubelike
                pattern).
              </Text>
              <Text>
                d. If there are multiple divisions in the plane it generates
                staphylococci (multiple plane and grape-like structure).
              </Text>
              <Text className="font-bold mt-10 text-lg">Single Bacillus:</Text>
              <View className="flex-row items-center gap-3">
                <View className="flex-1 h-[250px]" {...events6}>
                  <Canvas>
                    <OrbitControls6 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <SingleBacillus />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="font-bold mt-10 text-lg">Diplobacilli:</Text>
              <View className="flex-row items-center mt-10 gap-3">
                <View className="flex-1 h-[200px]" {...events7}>
                  <Canvas>
                    <OrbitControls7 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Diplobacilli />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="font-bold mt-10 text-lg">Streptobacilli:</Text>
              <View className="flex-row items-center mt-10 gap-3">
                <View className="flex-1 h-[300px]" {...events8}>
                  <Canvas>
                    <OrbitControls8 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Streptobacilli />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="font-bold mt-10 text-lg">Coccobacillus:</Text>
              <View className="flex-row items-center -mt-60 gap-3">
                <View className="flex-1 h-[300px]" {...events9}>
                  <Canvas>
                    <OrbitControls9 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>
                      <Coccobacillus />
                    </Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
              <Text className="font-bold mt-10 text-lg">Eukaryotes:</Text>
              <Text>
                Composed of organisms such as algae, protozoa, fungi, plants and
                animals. It can cause diseases but others are normal.
              </Text>
              <View className="flex-row items-center mt-10 gap-3">
                <View className="flex-1 h-[200px]" {...events10}>
                  <Canvas>
                    <OrbitControls10 enablePan={true} enableRotate enableZoom />
                    <directionalLight position={[1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[-1, 0, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, -1, 0]} args={["white", 5]} />
                    <directionalLight position={[0, 0, 1]} args={["white", 5]} />
                    <directionalLight position={[0, 0, -1]} args={["white", 5]} />
                    <Suspense fallback={null}>{/* <Eukaryotes /> */}</Suspense>
                  </Canvas>
                </View>
                {/* <Image
                  source={require("@/assets/topic3img/telrad.png")}
                  style={{ width: 150, height: 150, borderRadius: 10 }}
                /> */}
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </>
    );
  };
  
  export default Topic3;
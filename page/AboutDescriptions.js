import React, { Component } from 'react';
import { View } from 'react-native';

import pageStyles, { A, H2, H1, H3, Bull, P, Strong, BullHeader,BullHeaderMain } from "./styles.js";


export const ProjectDescription = {
    "Hindi": () => (
        <View>
            <P>
                <Strong> आशियाँ </Strong>एक इंटरैक्टिव मोबाइल डॉक्यूमेंट्री फ़िल्म है जिसे घरेलू श्रमिकों, गृहणियों  और दिल्ली की एक फिल्म निर्माता द्वारा सह-निर्मित किया गया है।इंटरैक्टिव डाक्यूमेंट्री वह होती है  जिस में आप स्वयं, अपनी पसंद की कहानी का चयन कर सकते हैं और अपनी कहानी भी उस में शामिल कर सकते हैं | भारत में फिल्मायी गयी यह डॉक्यूमेंटरी विभिन्न मीडिया (मोबाइल फ़ोन, इंटरनेट इत्यादि) के ज़रिये नई दिल्ली (भारत) में फ़िल्मकारों, स्वयंसेवकों, हैकर्स (कम्प्यूटर की दुनिया के जुगाड़ू) और मित्रों के सहयोग तथा रायरसन और यॉर्क विश्वविद्यालय (कैनडा); कोड फॉर बोस्टन (अमेरिका) और एम.आई.टी. की ओपन डॉक्यूमेंट्री लैब (अमेरिका) के सहयोग से बनी है।

            </P>
            <P>
                यह डॉक्यूमेंटरी दिल्ली की 'अदृश्य' महिलाओं के जीवन और अनुभवों का एक जीवित संग्रह है। यह कई आकार लेता है। एक इंटरैक्टिव मोबाइल ऐप के ज़रिए आप इन महिलाओं की असुरक्षित शहरी क्षेत्रों में रहने, चलने और अपनी राह बनाने की बातचीत में शामिल हो सकते हैं | आप एक ऑडियो-विज़ुअल गैलरी (चित्र और संवाद) के ज़रिये इन महिलाओं की उम्मीदों, यादों और आकांक्षाओं का अनुभव कर सकते हैं |

            </P>
            <P>
                यदि आप इन महिलाओं के बारे में और जानना चाहते हैं और उनकी आंखों से शहर का अनुभव करना चाहते हैं आप अपनी यात्रा का चयन कर सकते हैं या YouTube पर हमारे इंटरैक्टिव संग्रह पर जा सकते हैं। आप यह भी देख सकते हैं कि ये सह-निर्माता अपनी रोज़ मर्रा की ज़िन्दगी के दौरान  फ़िल्मकार कैसे बनीं?

            </P>
            <P>
            जब शहरों को असुरक्षित महसूस किया जाता है, तब महिलायें आंकड़ों और पीड़ितों के रूप में दिखाई देती हैं। <Strong> आशियाँ </Strong> इस कथन को विभिन्न वर्गों की महिलाओं के अनुभव के माध्यम से चुनौती देता है। इन महिलाओं द्वारा किए गए घरेलू श्रम, फ़िल्मी श्रम, उनके रचनात्मक श्रम को आकार देते हैं क्योंकि वे वार्तालाप स्थापित करते हैं, उनकी जीवनियाँ दर्शाते हैं और कभी कभी नाचते मोर दिखाते है। <Strong> आशियाँ </Strong> का मतलब घोंसला,  घर ... अपनी स्वयं की व्यक्तिगत दुनिया है।
            </P>
        </View>
    ),

    "English": () => (
        <View>
            <P>
                <Strong>Aashiyaan</Strong> is an interactive mobile documentary that has been co-created by domestic workers, homemakers and a filmmaker from Delhi. Filmed entirely in India, the transmedia project was developed with support from artists, volunteers, hackers and friends in New Delhi, India; Ryerson and York Universities, Canada; Code for Boston, USA and the Open Documentary Lab at MIT, USA.             </P>
            <P>
                The documentary is a living archive of the lives and experiences of the ‘invisible’ women of Delhi. It takes on many shapes. As an interactive mobile app it invites viewsers to listen to and participate in women’s conversations about how they navigate unsafe urban geographies. You can also explore an audio-visual gallery that maps the psychogeoraphies of the women as they speak of nostalgia, loss and desire in the city.
            </P>
            <P>
                To know more about the women and to experience the city through their eyes you can choose your journey on a map or visit the interactive archive on YouTube. You can even see how these co-creators became documentarians with their own unique point of view on www.aashiyaan.org.
            </P>
            <P>
                When cities are labelled unsafe, women appear as statistics and victims. <Strong> Aashiyaan </Strong> challenges that dehumanization by presenting cross-class experiences of women in the city. The domestic labour performed by these women, who are also also the filmmakers,  shapes their creative labour as they set up conversations, film everyday activities and even chase peacocks. <Strong>Aashiyaan</Strong> translates to a nest, a home...your own personal sanctuary.
            </P>
        </View>
    )
}

export const ProjectCredits = (languageMap)=> {
    return <ProjectCreditsList {...{languageMap}}> </ProjectCreditsList>
};

export const ProjectCreditsList = ({languageMap}) => (
    <View>

        <BullHeader> {languageMap.children["coCreators"]} </BullHeader>

        <Bull> Deepa Sardar </Bull>
        <Bull> Gurvinder Heer </Bull>
        <Bull> Jaskeerat Singh </Bull>
        <Bull> Manorama Gupta </Bull>
        <Bull> Pushpa Gaba </Bull>
        <Bull> Reeta Minz </Bull>
        <Bull> Sangeeta Chauhan </Bull>
        <Bull> Shahina Taiyeb  </Bull>
        <Bull> Meenakshi Rajan </Bull>
        <Bull> (1966-2016) </Bull>

        <BullHeader> {languageMap.children["coCreatorAssistance"]} </BullHeader>
        <Bull> Adiba Muzaffar </Bull>
        <Bull> Aryan Minz </Bull>
        <Bull> Anju Gupta </Bull>
        <Bull> Gurjeet Heer </Bull>
        <Bull> Payal Sardar </Bull>
        <Bull> Preeti Sardar </Bull>
        <Bull> Sabika Muzaffar </Bull>

        <BullHeader> {languageMap.children["researchAssistance"]} </BullHeader>
        <Bull> Umang Sabarwal </Bull>

        <BullHeaderMain> {languageMap.children["teamDelhi"]} </BullHeaderMain>

        <BullHeader> {languageMap.children["filmProduction"]} </BullHeader>

        <Bull> Abhishek Yadav </Bull>
        <Bull> Alisha Chatterjee </Bull>
        <Bull> Aoun Naqvi </Bull>
        <Bull> Nagma Sahi Ansari </Bull>
        <Bull> Umang Sabarwal </Bull>

        <BullHeader> {languageMap.children["filmEditing"]} </BullHeader>

        <Bull> Saugata Paul </Bull>
        <Bull> Subhash Bhanwala </Bull>

        <BullHeader> {languageMap.children["soundEditing"]} </BullHeader>

        <Bull> Vishnu Rajeev </Bull>

        <BullHeader> {languageMap.children["photoGraphy"]} </BullHeader>

        <Bull> Aoun Naqvi </Bull>
        <Bull> Harneet Singh </Bull>

        <BullHeaderMain> {languageMap.children["teamBoston"]} </BullHeaderMain>
        <BullHeader> {languageMap.children["developers"]} </BullHeader>

        <Bull> Andrew Seeder  </Bull>
        <Bull> Liani Lye  </Bull>
        <Bull> (Project Managers) </Bull>
        <Bull> Brian Sanders  </Bull>
        <Bull> Byron Hinebaugh  </Bull>
        <Bull> Dhara Bhavsar  </Bull>
        <Bull> Kalen Hammann  </Bull>
        <Bull> Liam Morley  </Bull>
        <Bull> Ranjani Rajagopalan  </Bull>
        <Bull> Sasha Goldberg  </Bull>
        <Bull> Steve Man  </Bull>
        <Bull> Tighe Carroll  </Bull>

        <BullHeader> {languageMap.children["uiUX"]} </BullHeader>

        <Bull> David McCaleb </Bull>
        <Bull> Kristine Auwers </Bull>
        <Bull> Lizao Wang </Bull>
        <Bull> Mel Choyce </Bull>
        <Bull> Mike Yavorsky </Bull>

        <BullHeader> {languageMap.children["illustrators"]} </BullHeader>
        <Bull> Nika Vaks </Bull>
        <Bull> Saugata Paul </Bull>
        <Bull> Valerie Kenyon </Bull>


        <BullHeader> {languageMap.children["filmEditing"]} </BullHeader>
        <Bull> Sasha Goldberg  </Bull>
        <Bull> Subhash Bhanwala </Bull>
        <Bull> Saugata Paul </Bull>

        <BullHeader> {languageMap.children["filmEditingAssistance"]} </BullHeader>
        <Bull> Ellie LaCourt  </Bull>
        <Bull> Macsonny Onyechefule </Bull>
        <Bull> Mike Yavorsky </Bull>

        <BullHeader> {languageMap.children["web"]} </BullHeader>
        <Bull> Ian Hill  </Bull>
        <Bull> Nick Francisci </Bull>

        <BullHeader> {languageMap.children["translators"]} </BullHeader>
        <Bull> Ankit Amit </Bull>
        <Bull> Akshaya Sawant </Bull>
        <Bull> Alisha Chatterjee </Bull>
        <Bull> Anandana Kapur </Bull>
        <Bull> Anchita Krishna</Bull>
        <Bull> Arjun Soni </Bull>
        <Bull> Anusha Jain </Bull>
        <Bull> Bidisha Saikia </Bull>
        <Bull> Kavita Kumra </Bull>
        <Bull> Kush Pathak </Bull>
        <Bull> Isha Vedantam </Bull>
        <Bull> Priyanka Yadav </Bull>
        <Bull> Ranjani Rajagopalan</Bull>
        <Bull> Rashmi Ravindran </Bull>
        <Bull> Rohan Mehta </Bull>
        <Bull> Shweta Prajapati </Bull>
        <Bull> Sudeshna Mahata </Bull>
        <Bull> Taiyaba Ali </Bull>
        <Bull> Tatheer Naqvi</Bull>
        <Bull> Vidya Kamudini </Bull>

        <BullHeader> {languageMap.children["institutionalPartner"]} </BullHeader>
        <Bull> Code for Boston </Bull>

        <BullHeader> {languageMap.children["institutionalSupport"]} </BullHeader>
        <Bull> Open Documentary Lab, MIT </Bull>
        <Bull> Jamia Millia Islamia </Bull>
        <Bull> Shastri Indo Canadian Institute </Bull>
        <Bull> The Fulbright Association </Bull>
        <Bull> The Ryerson University </Bull>
        <Bull> York University </Bull>

        <BullHeader> {languageMap.children["principalResearchAdvisor"]} </BullHeader>
        <Bull> Krisna Sankar Kusuma (India) </Bull>

        <BullHeader> {languageMap.children["academicAdvisors"]} </BullHeader>

        <Bull> Krisna Sankar Kusuma (India) </Bull>
        <Bull> Blake Fitzpatrick (India) </Bull>
        <Bull> Gerda Cammaer (Canada) </Bull>
        <Bull> William Uricchio (USA) </Bull>

        <BullHeader> {languageMap.children["projectAdvisors"]} </BullHeader>

        <Bull> Aanchal Kapur </Bull>
        <Bull> Tony Dowmunt </Bull>

        <BullHeader> {languageMap.children["specialThanks"]} </BullHeader>
        <Bull> Afsana Aapa </Bull>
        <Bull> Alisa Lebow </Bull>
        <Bull> Carles Sora </Bull>
        <Bull> Danny Goldfield </Bull>
        <Bull> Dinesh Kapur </Bull>
        <Bull> Josefina Buschmann </Bull>
        <Bull> Mandy Rose </Bull>
        <Bull> Niharika Arora </Bull>
        <Bull> Isabelle Raynauld </Bull>
        <Bull> Rambatti ji </Bull>
        <Bull> Rashin Fahandej </Bull>
        <Bull> Sarah Wolozin </Bull>
        <Bull> Shirin Anlen </Bull>
        <Bull> Soha Aapa </Bull>
        <Bull> The Batras </Bull>


        <BullHeader>Curator/Creator | क्यूरेटर/ रचनाकार </BullHeader>

        <Bull> Anandana Kapur </Bull>

        <BullHeader> © GPL2 2018</BullHeader>

    </View>
);

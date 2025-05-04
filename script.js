document.addEventListener('DOMContentLoaded', () => {
    // --- PWA Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        }).catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    }

    // --- Base Template Definition (Titles NOT bolded) ---
    // Added ${invasiveTreatmentNote} and ${selectedPdfs} placeholders
    let baseTemplate = `AREA: \${area || '[N/A]'}\t\t\t\t\t\t\tACRES: \${acres || '[N/A]'}

MAJOR TREE SPECIES AND SIZE CLASS:
\${majorSpecies || '[N/A]'} are the primary species. These are primarily \${sizeClassText}.

STOCKING:
This stand is \${stockingLevel || '[N/A]'} stocked. Stocking is an indication of the number of trees in a stand as compared to the desirable number for best growth and management.
\${stockingExplanationText}
Per acre there is an estimate \${treesPerAcre || '[N/A]'} trees, with an average tract DBH of \${avgDbh || '[N/A]'} inches, and \${basalArea || '[N/A]'} sq.ft. of basal area.

FOREST STAND HEALTH:
This stand is in \${standHealth || '[N/A]'} health with scattered \${invasiveSpecies || '[N/A]'}. \${invasiveTreatmentNote}
\${healthNotes}
TIMBER STAND QUALITY:
The quality of the timber in this stand is \${timberQuality || '[N/A]'} health.
\${qualityNotes}
REPRODUCTION AND SPECIES:
Reproduction is primarily seedling and sapling size \${regenSpecies || '[N/A]'}.

SITE QUALITY:
Site index is an estimate of the site's productivity and is based on the expected height that trees of a given species will attain at age 50. White oaks growing on this site are expected to attain a height of \${whiteOakHeight || '[N/A]'} feet in fifty years. The site index for black oak is \${blackOakSI || '[N/A]'}, and \${yellowPoplarSI || '[N/A]'} for yellow poplar. This is considered \${siteProductivity || '[N/A]'} productivity.

SOIL TYPE:
\${soilSectionText}

STAND HISTORY:
This stand was last harvested approximately \${lastHarvestAge || '[N/A]'} years ago.
\${historyNotes}
FOREST WILDLIFE CONDITIONS:
\${wildlifeSectionText}

RECOMMENDATION:
\${finalRecommendations || '[No recommendations selected or entered.]'}

ATTACHED REFERENCE PDFS:
\${selectedPdfs || '[None Selected]'}
`;

    // --- List of Reference PDFs (Using Filenames) ---
    const referencePdfs = [
        // Reference A/B (Using placeholders as actual filenames might vary)
        { name: "ReferenceA_Stocking_7-15.pdf", value: "ReferenceA_Stocking_7-15.pdf" }, // Example filename
        { name: "ReferenceA_Stocking_3-7.pdf", value: "ReferenceA_Stocking_3-7.pdf" },   // Example filename
        { name: "ReferenceB_TSI_Invasive.pdf", value: "ReferenceB_TSI_Invasive.pdf" },   // Example filename
        // Guides from OCR
        { name: "TreesAndShrubs_Planting.pdf", value: "TreesAndShrubs_Planting.pdf" },
        { name: "TreeOfHeaven_Control.pdf", value: "TreeOfHeaven_Control.pdf" },
        { name: "EdgeFeathering.pdf", value: "EdgeFeathering.pdf" },
        { name: "WildflowerPlanting.pdf", value: "WildflowerPlanting.pdf" },
        { name: "ProperPruning.pdf", value: "ProperPruning.pdf" },
        { name: "MultifloraRose_Control.pdf", value: "MultifloraRose_Control.pdf" },
        { name: "Paulownia_Control.pdf", value: "Paulownia_Control.pdf" },
        { name: "Privet_Control.pdf", value: "Privet_Control.pdf" },
        { name: "BushHoneysuckle_Control.pdf", value: "BushHoneysuckle_Control.pdf" },
        { name: "JapaneseStiltgrass_Control.pdf", value: "JapaneseStiltgrass_Control.pdf" },
        { name: "CalleryPear_Control.pdf", value: "CalleryPear_Control.pdf" },
        { name: "WinterCreeper_Control.pdf", value: "WinterCreeper_Control.pdf" },
        { name: "OrientalBittersweet_Control.pdf", value: "OrientalBittersweet_Control.pdf" }
        // Add any other actual PDF filenames here
    ];


    // --- Structured Canned Recommendations ---
    const allRecommendations = {
        "FOREST HEALTH RECOMMENDATIONS": [
            {
                title: "(Emerald Ash Borer (EAB) Impact)",
                text: `(Emerald Ash Borer (EAB) Impact)\nEmerald Ash Borer (EAB), an invasive insect, is present in the region and is causing widespread mortality of ash trees. Ash trees within this stand [[are showing signs of decline / will likely be impacted soon / are already mostly dead]]. Unfortunately, there are no practical treatments to protect ash in a woodland setting.\n•\t(Option A - Preemptive/Salvage): Consider harvesting merchantable ash trees before they die and lose timber value, especially if a harvest is planned for other species soon, or if they pose a safety hazard.\n•\t(Option B - Habitat Focus): Dead and dying ash trees provide valuable habitat (snags) for woodpeckers and other cavity-nesting wildlife. Unless they pose a safety hazard near structures or trails, consider leaving some standing for wildlife benefits.\n•\t(Option C - Future Impact): The loss of ash will create canopy gaps, increasing sunlight to the forest floor. This will release existing regeneration but may also favor less desirable species or invasive plants if present. Monitor these gaps for invasive species establishment.`
            },
            {
                title: "(Storm Damage Assessment & Management)",
                text: `(Storm Damage Assessment & Management)\nRecent storm events [[Specify type, e.g., ice storm in 2009, recent wind storm]] have caused damage within this stand, including broken limbs, bent stems, and uprooted trees.\n•\tSafety First: Identify and remove any hazard trees or broken limbs that pose a risk to homes, buildings, roads, trails, or frequently used areas.\n•\tSalvage Potential: Assess downed or heavily damaged trees for potential salvage timber or firewood value. Prompt removal may be necessary for valuable logs to prevent degrade.\n•\tFuture Management: Recognize that storm damage can create entry points for decay and disease, potentially reducing the long-term quality of some remaining trees. Future TSI or harvest plans may need to prioritize removal of significantly damaged stems. Monitor openings for invasive species.`
            },
            {
                title: "(Drought Stress Impact)",
                text: `(Drought Stress Impact)\nRecent or periodic drought conditions can stress trees, especially those on drier sites (ridgetops, south/west slopes) or shallow soils. Symptoms may include premature leaf drop, crown dieback, or increased susceptibility to secondary pests/diseases.\n•\tMonitoring: Continue to monitor tree health, particularly for high-value or dominant trees, especially during and after drought periods.\n•\tManagement: In future TSI or thinning operations, prioritize retaining drought-tolerant species appropriate for the site and consider removing heavily stressed or declining trees that are competing with healthier individuals. High-value yard trees may benefit from supplemental watering during extreme droughts.`
            },
            {
                title: "(Specific Native Pest/Disease Concern)",
                text: `(Specific Native Pest/Disease Concern)\nSigns consistent with [[Name specific disease/pest, e.g., Hypoxylon canker on oaks, bacterial leaf scorch on elm/sycamore, pine wilt]] were observed in [[Location/Species affected]].\n•\tMonitoring: Monitor the affected trees and surrounding area for spread or further decline. Take photos if possible.\n•\tManagement: For [[Disease/Pest Name]], management often involves [[Briefly describe typical management, e.g., removing severely infected trees to reduce spread (if applicable), improving stand vigor through thinning, or noting that little can be done for certain widespread issues]]. Contact KDF or UK Forestry Extension for specific diagnosis confirmation and current management recommendations if the problem appears significant or is worsening.`
            }
        ],
        "INVASIVE SPECIES CONTROL": [
            {
                title: "(Invasive Species – General)",
                text: `(Invasive Species – General)\nControl treatments of [[(Name specific species, e.g., Tree-of-Heaven, Royal Paulownia, Bush Honeysuckle, Privet, Japanese Stiltgrass, etc.)]] should be completed as soon as feasible to prevent further spread and negative impacts to desired regeneration and native plant communities. Crucially, treat existing invasive species before major disturbances like timber harvesting or significant TSI to prevent their rapid expansion into newly opened areas. This area will likely need monitoring and follow-up treatments for several years. Herbicides applied to foliage, bark, or frill cuts on the stem are effective for controlling various invasive species. For most treatments, herbicides containing the active ingredients glyphosate or triclopyr are recommended.\n\nPlease see Reference B for additional details on invasive species treatment and application methods. Also included are publications with example treatment guides for [[List specific guides included, e.g., Tree-of-Heaven, Bush Honeysuckle]].\n\nBe sure to read and follow all herbicide label instructions. The label is the law. Adherence to the label will ensure protection of you and the environment, will ensure efficient use of your time and resources, and will ensure attainment of your management objectives. Always use appropriate Personal Protective Equipment (PPE).\n\nThe Kentucky Division of Forestry offers a free marking service where we mark undesirable invasive trees/shrubs for removal/treatment. Cost share funding is often available to complete these types of practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service (NRCS) office in [[(Insert County Name)]] County at [[(Insert NRCS Phone Number)]] for more information on eligibility.`
            },
            {
                title: "(Foliar Treatment)",
                text: `(Foliar Treatment)\nTo treat [[(Specify low-growing species/resprouts, e.g., Japanese Honeysuckle, Multiflora Rose, young Privet/Bush Honeysuckle, Stiltgrass)]], a foliar herbicide application is recommended. Apply between June 1st and late October/early November (before leaf color change/hard frost) when plants are actively growing. Use a solution of glyphosate or triclopyr amine (approx. 2-3%) in water with a surfactant (unless included in the formulation). Ensure thorough coverage of foliage, ideally spraying below waist height to minimize non-target drift. Check herbicide label for specific rates and compatible surfactants. Consider late fall/early spring applications for semi-evergreen species like honeysuckle to minimize impact on dormant native plants.`
            },
            {
                title: "(Basal Bark Treatment)",
                text: `(Basal Bark Treatment)\nTo treat woody invasive stems (typically <6 inches diameter) like [[(Specify species, e.g., Tree-of-Heaven saplings/poles, Privet, Bush Honeysuckle, Callery Pear, Autumn Olive)]] a basal bark treatment is effective. Mix a triclopyr ester formulation (check label for oil solubility, typically 60%+ active ingredient) with a carrier oil (basal oil, diesel fuel, kerosene, or methylated seed oil) usually at a concentration of 20-25% herbicide (e.g., 1 part herbicide to 3-4 parts oil). Check the label for specific mixing rates. Thoroughly spray the mixture around the entire circumference of the lower 12-18 inches of the stem, wetting the bark to the point of runoff but not puddling. This method can often be applied year-round, but avoid extreme heat or when snow/water prevents reaching the stem base.`
            },
            {
                title: "(Cut Stump Treatment)",
                text: `(Cut Stump Treatment)\nTo treat stumps of cut invasive shrubs or trees like [[(Specify species, e.g., Privet, Bush Honeysuckle, Multiflora Rose, Mimosa)]] and prevent resprouting, use a cut-stump treatment. Cut the stem close to the ground (within a few inches). Immediately (within minutes if possible) apply a concentrated herbicide solution (glyphosate 50-100% or triclopyr amine 50-100%) directly to the cut surface, ensuring coverage of the outer edge (cambium layer). A spray bottle or dauber can be used. This method is effective most times of the year but avoid periods of heavy sap flow (late winter/early spring). (Note: Generally avoid cut-stump for Tree-of-Heaven due to potential for increased root suckering).`
            },
            {
                title: "(Hack and Squirt / Frill Girdle Treatment)",
                text: `(Hack and Squirt / Frill Girdle Treatment)\nTo treat larger invasive trees, especially Tree-of-Heaven or Royal Paulownia, while minimizing root suckering, use a hack-and-squirt or frill girdle treatment. Use a hatchet to make continuous or spaced downward-angled cuts (frill) or hacks into the sapwood around the circumference of the tree at a convenient height. Do not cut so deeply or continuously as to completely girdle the tree mechanically if using spaced hacks. Immediately apply a concentrated herbicide (glyphosate or triclopyr amine, often 50-100% concentration) into the cuts until the exposed wood is saturated. Spacing is typically one hack per 1-2 inches of diameter, with a minimum of two. This method is most effective from mid-summer through early fall (July-November).`
            }
        ],
        "TIMBER STAND IMPROVEMENT (TSI)": [
            {
                title: "(Crop Tree Release - TSI General)",
                text: `(Crop Tree Release - TSI General)\nThis area would benefit from a crop tree release timber stand improvement (TSI) practice. This TSI would focus on locating desirable native species (crop trees) with good form and releasing them from competition by removing adjacent competing trees (typically on 2-4 sides of the crop tree's crown). Competing trees selected for removal often include damaged, diseased, poor form, lower-value, or undesirable species that are overtopping or crowding the chosen crop trees. Eliminating this competition will open up the canopy, providing more sunlight, water, and nutrients, thereby improving the growth, vigor, and mast production of the desired crop trees and enhancing the overall quality and value of the future stand.\n\nReference B attached details different Timber Stand Improvement application methods (felling, girdling, hack-and-squirt). Herbicide use is often necessary for effective control of sprouting species.\n\nThe Kentucky Division of Forestry offers a free timber stand improvement marking service where we mark the undesirable trees to be removed. Cost share funding is often available to complete these types of TSI practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service office in [[(Insert County Name)]] County at [[(Insert NRCS Phone Number)]] for more information on eligibility.`
            },
            {
                title: "(Advanced Oak Regen TSI / Suppressed Oak Release)",
                text: `(Advanced Oak Regen TSI / Suppressed Oak Release)\nThis stand contains promising advanced oak and/or hickory regeneration (seedlings/saplings >4.5 ft tall) or pole-sized trees that are currently being suppressed by less desirable competing species such as [[(Specify competing species, e.g., maple, beech, yellow-poplar, elm, eastern redcedar)]]. A crop tree release TSI is recommended, specifically targeting the removal of competitors around these desirable oak/hickory stems. Releasing these stems now is crucial to ensure their survival and recruitment into the main canopy, preventing them from being shaded out over time and maintaining the hard mast component of the forest.`
            },
            {
                title: "(Rehabilitating High-Graded / Poorly Managed Stands)",
                text: `(Rehabilitating High-Graded / Poorly Managed Stands)\nPast harvesting practices (e.g., diameter-limit cutting, high-grading) or lack of management has resulted in a stand condition characterized by [[Describe issues, e.g., dominance of low-quality trees, undesirable species like beech/maple, poor structure, lack of desirable regeneration]]. Rehabilitation will require deliberate effort.\n•\tRecommendation: Prioritize control of any invasive species present. Implement Timber Stand Improvement (TSI) focusing on removing the poorest quality residual trees, cull stems, and undesirable species to release any existing trees with potential (even if few). Evaluate the need for underplanting desirable species (like oak) in canopy gaps if natural regeneration is inadequate. Recognize that restoring productivity and desirable composition may be a long-term process.`
            },
            {
                title: "(Managing Stands Dominated by Less Desirable Natives)",
                text: `(Managing Stands Dominated by Less Desirable Natives)\nThis stand is heavily dominated by [[Species, e.g., American beech, sugar/red maple, sweetgum, elm, boxelder]], particularly in the [[Canopy layer, e.g., midstory, understory, co-dominant canopy]]. This is suppressing the regeneration and growth of more desirable species like oak and hickory.\n•\tOption A (Pre-Harvest Goal): If improving oak regeneration before a future harvest is the goal, consider a midstory removal treatment 5-10 years prior to the planned harvest. This involves targeted killing (usually with herbicide) of the competing beech/maple/etc. in the understory and midstory.\n•\tOption B (General Improvement TSI): Implement TSI to specifically target the removal or control of the dominant undesirable native species where they are directly competing with existing desirable crop trees (oaks, hickories, walnuts, quality yellow-poplar, etc.) or where their removal can create favorable conditions for establishing desired regeneration. Herbicide treatment (hack-and-squirt or basal bark) is usually necessary for effective control of sprouting species like maple and beech.`
            },
            {
                title: "(Non Cost Share TSI / Light Thinning)",
                text: `(Non Cost Share TSI / Light Thinning)\nThis area would benefit from a light Timber Stand Improvement (TSI) or “thinning.” This involves killing or felling select cull, diseased, defective, or otherwise undesirable trees that are competing with adjacent, better-quality potential crop trees. Even removing a few key competitors per acre can improve the vigor and growth rate of the remaining desirable trees by increasing available sunlight, water, nutrients, and crown space. While this level of treatment may not meet the minimum requirements for cost-share programs, the practice is still beneficial for improving long-term stand health and value.\n\nThe Kentucky Division of Forestry offers a free timber stand improvement marking service where we mark the undesirable trees to be removed. Please contact our office if you have questions or wish to schedule marking.`
            },
            {
                title: "(Post Harvest TSI)",
                text: `(Post Harvest TSI)\nTimber stand improvement (TSI) is highly recommended following a harvest, ideally completed within one to two years before dense new growth makes the work impractical. TSI should focus on:\n•\tKilling or felling cull trees (poor quality, damaged, diseased) left after logging.\n•\tCutting grapevines competing with desirable regeneration or residual trees.\n•\tCompleting regeneration openings by removing any remaining undesirable stems (e.g., non-merchantable beech/maple) that could suppress the developing desirable seedlings and sprouts.\nThis follow-up work is crucial for maximizing the growth of valuable regeneration and residual trees, improving the overall timber quality of the next stand, and fully realizing the benefits of the harvest.\n\nCost share funding is often available to complete these types of TSI practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service office in [[(Insert County Name)]] County at [[(Insert NRCS Phone Number)]] for more information on eligibility.`
            }
        ],
        "LET GROW / MONITOR": [
            {
                title: "(Let Grow – Young/Poletimber Stand)",
                text: `(Let Grow – Young/Poletimber Stand)\nThis area should primarily be allowed to grow and mature naturally at this time. The timber is mostly [[Describe size, e.g., poletimber, sapling/pole mix]] sized and generally of fair to good quality, but requires additional time to reach merchantable size and value. The trees have not yet fully occupied the available growing space, or natural competition is still effectively shaping the stand. This area should be reevaluated in approximately [[5-10 or 10-15]] years to assess its development and determine future management needs, such as potential for TSI or harvest timing. Continue periodic monitoring for invasive species.`
            },
            {
                title: "(Let Grow - Cedar Dominated Stand)",
                text: `(Let Grow - Cedar Dominated Stand)\nThis area is predominantly eastern redcedar, typical of old-field succession. No active management is required at this time. If left undisturbed, hardwood species present in the understory or seeding in will eventually overtop the cedar/pine, and the stand will gradually transition towards a mixed hardwood forest over several decades. You could cut cedar/pine for personal use (e.g., fence posts, firewood) if desired. This stand provides valuable thermal cover for wildlife. Consider having a forester re-inspect this area in 10-15 years to determine if management actions like thinning or releasing desirable hardwoods are warranted. Monitor for invasive species.`
            },
            {
                title: "(Let Grow – Maturing Stand / No Harvest Recommended Now)",
                text: `(Let Grow – Maturing Stand / No Harvest Recommended Now)\nThe timber in this area is developing well and shows no signs of significant health decline or widespread stagnation. While some trees may be approaching merchantable size, allowing the stand to continue growing until a majority of the timber reaches the medium (18-23” DBH) and large (24”+ DBH) sawtimber size classes will significantly increase overall volume and value. A commercial harvest is not recommended at this time. Reevaluate this area's condition and market potential every [[5 or 10]] years to determine the appropriate timing for a future selective harvest or other management actions. Continue monitoring for invasive species.`
            },
             {
                title: "(Reevaluate in 5 Years for Thinning/TSI)",
                text: `(Reevaluate in 5 Years for Thinning/TSI)\nThis stand is currently densely stocked [[(or describe condition, e.g., heavy understory vegetation post-harvest)]] and would likely benefit from a thinning or TSI practice in the near future. However, immediate treatment may be impractical or less effective due to [[Reason, e.g., dense understory, recent disturbance, trees slightly too small for optimal crop tree selection]]. Allow the stand to develop for another 5 years. This should allow the canopy to differentiate further or for post-harvest vegetation to subside somewhat, making it easier and more effective to identify crop trees and implement TSI.`
            }
        ],
        "TIMBER HARVESTING": [
            {
                title: "(Selective Harvest Recommendation)",
                text: `(Selective Harvest Recommendation)\nThis area contains mature timber and is suitable for a selective harvest. A professionally marked selective harvest should be conducted, targeting trees that are:\n•\tBiologically mature or over-mature.\n•\tShowing signs of decline, disease, or significant damage (high-risk).\n•\tOf lower quality or undesirable species competing with higher-value crop trees.\nThe harvest should aim to maintain appropriate stand density, release promising future crop trees, improve overall stand health and composition, and generate income. A well-executed selective harvest will leave a residual stand with a varied size class distribution and sufficient high-quality trees for future growth and harvests (typically planned 20-30 years later). Invasive species should be treated prior to harvest. Post-harvest TSI is highly recommended.`
            },
            {
                title: "(Cedar/Pine Harvest Recommendation)",
                text: `(Cedar/Pine Harvest Recommendation)\nMerchantable [[eastern redcedar / Virginia pine / Loblolly pine]] should be harvested from this area. This species often colonizes old fields and may now be mature or declining, potentially hindering the development of more desirable native hardwoods underneath. Harvesting the cedar/pine will utilize this resource, increase sunlight to the forest floor, and release existing hardwood regeneration (oaks, hickories, etc., if present) or create conditions favorable for establishing new hardwood seedlings. This accelerates the natural transition to a hardwood-dominated forest. Wildlife may benefit from the resulting early successional habitat. I have supplied (or can supply) a list of potential timber buyers. Post-harvest TSI may be beneficial for managing the remaining hardwoods.`
            },
            {
                title: "(Clearcut Recommendation)",
                text: `(Clearcut Recommendation)\nDue to [[State reason: e.g., poor species composition (list dominant undesirable species), pervasive low quality/damage, specific regeneration goals for sun-loving species, salvage after major disturbance]], a regeneration harvest using the clearcut method is recommended for this area. This involves the removal of all merchantable stems to allow a new, even-aged forest stand to develop in full sunlight. Following the harvest, all remaining non-merchantable trees and stems (typically >2” DBH) of undesirable species should be felled or killed using herbicide to ensure the new regeneration is not suppressed. Modifications, such as leaving wildlife snags/den trees or retaining buffer strips along streams or sensitive areas, should be incorporated per BMPs and landowner objectives.`
            },
             {
                title: "(Pre-Harvest Mid-Story Removal for Oak)",
                text: `(Pre-Harvest Mid-Story Removal for Oak)\nTo improve the likelihood of successfully regenerating oak in this stand, a pre-harvest mid-story removal treatment is recommended approximately 5 to 10 years before the planned final harvest. This stand currently has mature oaks in the overstory but lacks sufficient advanced oak regeneration (seedlings/saplings >4.5 ft tall) in the understory, while having a dense midstory of shade-tolerant competitors like [[maple, beech, elm, hickory]]. This treatment involves selectively killing or removing these midstory competitors via herbicide (hack-and-squirt or basal bark) or cutting. This allows more sunlight to reach the forest floor, promoting the establishment and growth of oak seedlings originating from acorns produced by the overstory trees. Having established oak regeneration before the main harvest significantly increases the chance of oak being a major component of the next forest stand. Cost-share funding may be available for this practice.`
            },
            {
                title: "(KDF Timber Marking Service & Process)",
                text: `(KDF Timber Marking Service & Process)\nWhen a harvest is desired, trees designated for harvest should be marked by a qualified forester. The Kentucky Division of Forestry offers this service for a fee of $10.00 per thousand board feet (MBF) marked (minimum charge $100).\n•\tMarking: Marked trees receive two paint spots: one at eye level (approx. 4.5 ft) and one below stump height (<1 ft).\n•\tTally: As trees are marked, species, diameter, and merchantable height are recorded to estimate volume (in board feet).\n•\tReport: Upon completion, you receive a summary report detailing the number of trees and estimated volume by species, along with the total marked volume.\n•\tGuidance: You also receive a list of potential timber buyers in the region, a sample timber sale contract, and sample bid advertisement materials.\n•\tRequirement: Only marked trees should be harvested. Cutting unmarked trees voids the volume estimate and can negatively impact future stand potential and violate the marking agreement.\nIf you desire this KDF service, please call our office to request a Marking and Tallying Agreement.`
            },
            {
                title: "(Selling Timber - Sealed Bid & Consultants)",
                text: `(Selling Timber - Sealed Bid & Consultants)\nTo maximize financial return and ensure a professionally managed sale, consider the following:\n•\tSealed Bid: Selling marked timber via sealed competitive bid is highly recommended. This requires providing potential buyers with the KDF tally sheet (or consultant cruise report), a prospectus outlining sale terms, and allowing them time to inspect the timber before submitting confidential bids by a set deadline.\n•\tAdvertising: Advertise the sale widely to attract multiple bidders. KDF can provide a list of potential buyers.\n•\tContract: ALWAYS use a written timber sale contract. This legally binding document protects both buyer and seller by clearly defining terms such as: trees to be cut, sale price and payment schedule, contract duration (1-2 years typical), responsibility for damages, road/log landing location and condition requirements, insurance/indemnity clauses, and adherence to Kentucky Forest Conservation Act and BMP requirements. A sample contract is available.\n•\tConsulting Forester: For comprehensive assistance including timber appraisal, maximizing marketing exposure, administering the bid process, contract negotiation/enforcement, and harvest oversight, consider hiring a private consulting forester. Consultants work for the landowner and typically charge a percentage of the sale revenue. A list of consultants is available from KDF or the Kentucky Association of Consulting Foresters (KACF).`
            }
        ],
        "PLANTING": [
            {
                title: "(General Tree Planting Recommendation)",
                text: `(General Tree Planting Recommendation)\nPlanting trees is recommended for this open area [[Describe area, e.g., old field, retired pasture, riparian buffer]] to [[State goals, e.g., establish forest cover, improve wildlife habitat, protect soil and water quality, produce future timber, create a windbreak]].\n•\tSite Preparation: Control existing competing vegetation (especially sod-forming grasses like fescue) before planting. This is critical for seedling survival. Methods include mechanical tillage (plowing/disking) or herbicide application (e.g., glyphosate or sulfometuron-methyl based products) applied as broadcast or strips/spots). Follow label directions carefully. See the "Example Planting Schedule" handout for detailed options and timing.\n•\tSpecies Selection: Choose high-quality nursery stock appropriate for the site's soil type, moisture regime, and sunlight conditions, matching your management goals. For timber, consider oaks, walnut, yellow-poplar (on good sites). For wildlife, include a mix of hard mast (oaks, hickory) and soft mast (persimmon, plum, dogwood) producers. For bottomlands, use flood-tolerant species (e.g., swamp white oak, pin oak, river birch, sycamore). Consult your forester for specific species recommendations.\n•\tSeedling Source: Order seedlings well in advance (typically in the fall for spring planting) from reputable sources like the Kentucky Division of Forestry State Nursery or private nurseries specializing in regional genetics.\n•\tSpacing: Common spacing is 8'x8' (680 trees/acre), 10'x10' (436 trees/acre), or 12'x6' (605 trees/acre). Wider spacing requires less thinning later but may result in poorer initial tree form. Closer spacing allows for more crop tree selection but requires earlier management.\n•\tPlanting Technique: Plant seedlings during the dormant season (typically January through April). Use proper planting techniques (hand planting with a dibble bar/shovel or machine planting) ensuring the hole is adequate, roots are oriented naturally (not J-rooted), the root collar is at ground level, and soil is firmly packed around the roots. Keep roots moist before planting. See the "Proper Planting Technique" flyer.\n•\tMaintenance: Control competing weeds around seedlings for the first 2-5 years. This can be done through mowing between rows (timing mowing to avoid nesting season - May 15-July 15), targeted herbicide applications around seedlings (using shields or directed spray), or mulching. Protect seedlings from deer browse or rodent damage using tree shelters or repellents if significant damage occurs.\nCost-share funding may be available through NRCS/EQIP, CRP, or other programs to assist with planting costs. Contact your local NRCS office for details.`
            },
            {
                title: "(Example Planting Schedule)",
                text: `(Example Planting Schedule)\nEXAMPLE SCHEDULE:\nAs soon as possible\n•\tWhen a forester visits the property, decide on appropriate tree species and place a tree order.\nDo one or both of the following:\n1.\tHerbicide between August and November\n•\tMow the fescue field.\n•\tAllow the grass to re-grow 4-6 inches.\n•\tStrip-spray the field with an herbicide. Your trees will be planted inside the strips (where the grass has been killed) in the spring.\n2.\tHerbicide between February and April, and either\n•\tStrip-spray the field. Wait until the grass begins to turn brown. Plant your trees inside the brown rows.\nor\n•\tPlant your trees at the correct spacing. Before the trees begin to leaf out, spray herbicide along the rows of trees. If this is done after the leaves are on the trees, the trees will be killed.\nBetween January and April\n•\tPlant your trees at the recommended spacing.\n•\tIf you have used the strip-spraying method of herbicide treatment from the beginning, then you should be able to find your rows of trees very easily going forward. However, if you are planting trees in an old crop-field, or if you treat the entire planting area with herbicide, you should try to mark the location of each row of trees. Tree seedlings can be very small, and weeds grow very quickly. It's easy to lose your rows in a field of tall weeds.\nOptional: Seeding clover in rows\n•\tYou may choose to sow clover into your rows before you plant your trees. Many landowners have found that clover growing very thick in their tree rows decreases the number of weeds. And the clover, which is a legume, increases the nitrogen content in the soil, which benefits the trees.\n•\tWhether you choose white or red clover, it is generally recommended that clover be planted either between February 1 and April 15 or between August 1 and September 10. Make sure that your seeding rates and your chosen planting technique are appropriate for your site and for the equipment available to you.\n1 to 2 months after planting\n•\tUsing an appropriate herbicide, spot-spray trouble areas of grass and/or weeds.\n•\tIf you only have a grass problem near your tree seedlings, use an herbicide formulated to kill the grasses but not the trees, such as Poast or Vantage.\nREAD THE LABEL!\nAlthough the Kentucky Division of Forestry makes recommendations concerning herbicide use, you should always consult a licensed chemical supplier before purchasing and/or using any chemical. And be sure to first read and understand the product label.\nFrom the time of planting to 2 - 3 years after planting\n•\tMow between your rows of trees periodically. This should be done throughout the growing season, about every month (more or less, depending on the growth of the competition).\n•\tBe certain that you only mow between your rows of trees. If you mow down your trees because you didn't know where they were planted, the cost of reestablishment will fall to you.\n•\tOnce your trees are taller than the surrounding vegetation, they are considered to be "established". At that point, they will require very little maintenance. You should mow between your rows of trees only once every two years.`
            }
        ],
        "OTHER MANAGEMENT PRACTICES & CONSIDERATIONS": [
             {
                title: "(Protect from Grazing / Livestock Exclusion)",
                text: `(Protect from Grazing / Livestock Exclusion)\nWoodlands should be protected from livestock grazing. Cattle, horses, goats, etc., compact the soil (reducing water infiltration and root growth), physically damage tree roots and bases (allowing entry for decay), browse or trample desirable tree regeneration, and can increase erosion potential. Fencing is required to exclude livestock. If shade for livestock is needed, designate a specific, limited area or establish silvopasture practices separately from high-quality woodlands. Cost-share assistance for fencing may be available through NRCS/EQIP.`
            },
            {
                title: "(Firebreak Construction / Access Lane Maintenance)",
                text: `(Firebreak Construction / Access Lane Maintenance)\nWell-planned and maintained access lanes or firebreaks are essential for property management and protection. They provide access for timber harvesting, TSI, firewood cutting, recreation, monitoring, and fire suppression equipment.\n•\tLayout: Plan routes to minimize grading, follow contours where possible, and avoid steep slopes (>15-20%) and wet areas. Keep grades below 10% if possible.\n•\tConstruction/Maintenance: Maintain a width of 10-14 feet, clear of flammable vegetation. Install water bars, broad-based dips, or other water diversion structures according to BMPs on any sloped sections to prevent erosion. Seed disturbed areas with appropriate ground cover (e.g., wildlife mix, conservation grass mix). Regularly inspect and clear debris or encroaching vegetation. KDF personnel can provide technical assistance on layout and construction.`
            },
             {
                title: "(Riparian Area / Streamside Management Zone - SMZ)",
                text: `(Riparian Area / Streamside Management Zone - SMZ)\nMaintain a protected vegetated buffer along all perennial and intermittent streams, rivers, lakes, and ponds. This Streamside Management Zone (SMZ) is critical for water quality protection, bank stabilization, aquatic habitat, and terrestrial wildlife corridors.\n•\tWidth: Minimum recommended width is typically 50-60 feet on each side of the stream (measured from the top of the bank), wider on steeper slopes or more sensitive streams.\n•\tManagement: Avoid significant disturbance within the SMZ. Limit equipment operation and tree removal. If harvesting occurs, Kentucky BMPs require retaining at least 50% of the original tree canopy cover. Focus on removing only high-risk or specific undesirable trees. Avoid road construction or log landings within the SMZ. If planting is needed to establish or enhance the buffer, use native bottomland tree and shrub species.`
            },
            {
                title: "(Sensitive Area Protection)",
                text: `(Sensitive Area Protection)\nIdentify and protect areas with unique or sensitive features, such as cliffs, caves, sinkholes, significant rock outcrops, glades, prairie remnants, or habitats for rare species. Avoid significant disturbance like harvesting, road construction, or heavy equipment operation in or immediately adjacent to these areas unless specifically designed to enhance the feature (e.g., controlled burn in a glade). Consult with KDF or the Kentucky State Nature Preserves Commission if rare species or habitats are suspected.`
            },
            {
                title: "(Pruning Recommendation)",
                text: `(Pruning Recommendation)\nTo improve the future quality and value of high-value hardwood logs growing in relatively open conditions or plantations, consider pruning lower branches on selected crop trees.\n•\tGoal: Develop a clear, knot-free log section, typically the first 9 or 17 feet.\n•\tTechnique: Prune during the dormant season. Remove branches flush with the branch collar (do not leave stubs or cut into the trunk). Use sharp tools (hand saw, pole saw). Never remove more than 1/3 of the live crown height at one time. Maintain at least 40-50% live crown ratio.\n•\tTiming: Best done on younger trees (typically < 6-8 inches DBH) before lower branches become too large (>2-3 inches diameter). Multiple light prunings over several years are better than one heavy pruning. See "Proper Pruning Techniques" handout.`
            },
            {
                title: "(Boundary Line Maintenance)",
                text: `(Boundary Line Maintenance)\nClearly marked and maintained property boundaries are essential for good stewardship and preventing timber trespass or disputes.\n•\tAction: Locate and refresh boundary markings (paint blazes, corner markers) every 5-7 years using durable boundary line paint (typically orange or blue). Ensure lines are clearly visible.\n•\tUncertainty: If boundary locations are unknown or disputed, consult property deeds and consider hiring a licensed professional surveyor to establish and mark the correct lines before conducting management activities near the property edge.`
            },
            {
                title: "(Wildlife Habitat - General Enhancements)",
                text: `(Wildlife Habitat - General Enhancements)\nIn addition to managing the forest structure, consider these practices to benefit wildlife:\n•\tSnags/Den Trees: Retain several standing dead trees (snags) and live trees with cavities (den trees) per acre (e.g., 2-5) during TSI and harvesting operations, provided they don't pose a safety risk. These provide critical habitat for birds, mammals, reptiles, and amphibians.\n•\tMast Production: Favor a diversity of hard mast (oaks, hickory, beech, walnut) and soft mast (black cherry, persimmon, dogwood, serviceberry, blackberry, etc.) producing trees and shrubs during management activities.\n•\tEdge Management: Maintain soft edges between forests and fields (feathering) rather than hard, abrupt lines. Allow native shrubs and grasses to transition into the woodland.\n•\tKDFWR Contact: For specific habitat improvement recommendations tailored to target wildlife species (e.g., quail, turkey, deer, pollinators), contact your KDFWR Private Lands Biologist at [[(Insert PLB Phone/Contact Info)]]. Habitat How-To guides are also available online: https://fw.ky.gov/Wildlife/Pages/Habitat-How-To%27s.aspx`
            },
            {
                title: "(Prescribed Fire Introduction)",
                text: `(Prescribed Fire Introduction)\nPrescribed fire can be a valuable tool for [[List specific goals, e.g., restoring oak woodlands, managing pine stands, enhancing native grasslands/glades, reducing fuel loads, controlling certain invasive species]].\n•\tRequirements: Conducting a safe and effective prescribed burn requires specific training, a detailed written burn plan, adherence to Kentucky Division for Air Quality regulations and KDF fire laws (notification, timing restrictions during fire seasons), specific weather conditions (prescription window), adequate trained personnel, and proper safety equipment.\n•\tRecommendation: Do not attempt prescribed burning without proper training and preparation. Seek expert assistance and training. Attend a "Learn to Burn" workshop or consult resources from the Kentucky Prescribed Fire Council (www.kyfire.org). Consider hiring a certified prescribed burn manager if you lack experience.`
            },
             {
                title: "(Recreational Trail Development & Maintenance)",
                text: `(Recreational Trail Development & Maintenance)\nWell-planned trails can enhance recreational enjoyment of the property.\n•\tLayout & Design: Plan trail routes to minimize environmental impact. Follow contours where possible, avoid steep grades (>10-15%), wet areas, and sensitive habitats. Use switchbacks on slopes. Minimize stream crossings; use bridges or culverts where necessary. Keep trail width appropriate for intended use (hiking, ATV).\n•\tConstruction: Clear vegetation only as wide as needed. Minimize soil disturbance. Outslope the trail tread slightly where possible for drainage. Install water bars, check dams, or rolling dips on sloped sections according to BMPs to control erosion.\n•\tMaintenance: Periodically clear fallen limbs/trees, prune encroaching vegetation, inspect and clean drainage structures, and address any erosion issues promptly. Monitor trails for invasive species establishment.`
            },
            {
                title: "(Non-Timber Forest Products (NTFP) Potential)",
                text: `(Non-Timber Forest Products (NTFP) Potential)\nThis property may have potential for cultivating or sustainably harvesting Non-Timber Forest Products (NTFPs) such as [[List potential examples relevant to site, e.g., medicinal herbs like ginseng/goldenseal, edible mushrooms like shiitake/morels, decorative materials like grapevines/pine boughs, maple syrup]].\n•\tConsiderations: Successful NTFP development requires understanding the specific species' habitat needs, propagation or cultivation techniques, sustainable harvest levels, regulations (especially for wild-harvested species like ginseng), and potential markets.\n•\tResources: Consult resources from UK Forestry Extension, the Center for Agroforestry at the University of Missouri, or other NTFP specialists for detailed information before investing significant time or resources.`
            },
            {
                title: "(Forest Succession & Estate Planning)",
                text: `(Forest Succession & Estate Planning)\nForest management is a long-term investment often spanning multiple generations. Consider your long-term vision for the property and how it will be passed on.\n•\tRecommendation: Discuss your stewardship goals and plans with family members or potential heirs. Explore estate planning tools (wills, trusts, conservation easements) that can help ensure the property remains intact and managed according to your wishes in the future. Resources on forest estate planning are available through UK Forestry Extension and organizations like the National Woodland Owners Association.`
            },
            {
                title: "(General Monitoring Recommendation)",
                text: `(General Monitoring Recommendation)\nActive stewardship requires regular monitoring. Walk your property periodically (at least once or twice per year) specifically to observe forest conditions.\n•\tCheck For: New storm damage, signs of insect or disease outbreaks (e.g., unusual leaf discoloration, dieback, insect emergence holes), new invasive species infestations (especially along edges, trails, streams, disturbed areas), boundary line conditions, signs of trespass or unauthorized activity (e.g., dumping, timber theft, ATV use), and the general health and vigor of your trees and regeneration.\n•\tAction: Early detection allows for timely and often less costly management responses. Document observations and contact your forester if you notice significant changes or have concerns.`
            }
        ]
    };



    // --- State Variables ---
    let selectedRecTitles = []; // Stores titles of selected recommendations IN ORDER
    let placeholderValues = {}; // Stores user input for GENERIC placeholders { "Placeholder Text": "User Input" }
    let flatRecList = {}; // Stores original text { "Rec Title": "Original Text..." }

    // Full wildlife descriptions
    const wildlifeDescriptions = {
        "Well suited": `The area is well suited for wildlife. Forest conditions provide food and cover resources for wildlife throughout the year. It has a mixture of oaks and hickories that are producing hard mast (nuts), an essential food resource that many wildlife species depend upon during fall and winter months. The interior woodland understory includes a variety of shrubs, vines, briers, and forbs. Edges are dense, providing habitat diversity, woody and herbaceous browse, soft mast (berries), and cover for wildlife.`,
        "Not well suited now, potential future": `The area is not well suited for wildlife at the moment but has the potential to provide hard mast in the future. The interior woodland understory includes a variety of shrubs, vines, briers, and forbs. Edges are dense, providing habitat diversity, woody and herbaceous browse, soft mast (berries), and cover for wildlife.`,
        "Not well suited": `This area is not well suited for wildlife.`
    };
    const stockingExplanationDescriptions = {
        "Fully stocked": "Fully stocked indicates an optimal number of trees for growth and productivity.",
        "Over stocked": "Over stocked indicated a greater than optimal number of trees for growth and productivity.",
        "Under stocked": "Under stocked indicated fewer than optimal trees for growth and productivity."
    };

    // --- County NRCS Info ---
    const countyNrcsInfo = {
        "Simpson County": "(270) 586-4732",
        "Allen County": "(270) 237-3180",
        "Barren County": "(270) 629-6811",
        "Warren County": "(270) 843-1111",
        "Hart County": "(270) 524-5631"
        // Add more counties and numbers as needed
    };

    // --- Get DOM Elements ---
    const form = document.getElementById('forestryForm');
    const recTextarea = document.getElementById('generatedRecommendations');
    const editTemplateButton = document.getElementById('editTemplateButton');
    const viewFinalTxtButton = document.getElementById('viewFinalTxtButton');
    const submitButton = document.getElementById('submitButton');
    const stockingLevelDropdown = document.getElementById('stockingLevel');
    const recButtonsContainer = document.getElementById('recommendationButtonsContainer');
    const nrcsCountySelect = document.getElementById('nrcsCountySelect'); // County Dropdown
    const editTemplateModal = document.getElementById('editTemplateModal');
    const viewFinalTxtModal = document.getElementById('viewFinalTxtModal');
    const templateEditTextarea = document.getElementById('templateEditTextarea');
    const finalTxtEditTextarea = document.getElementById('finalTxtEditTextarea');
    const closeTemplateModalButton = document.getElementById('closeTemplateModal');
    const closeFinalTxtModalButton = document.getElementById('closeFinalTxtModal');
    const saveTemplateChangesButton = document.getElementById('saveTemplateChangesButton');
    const saveFinalTxtButton = document.getElementById('saveFinalTxtButton');
    const cancelTemplateModalButtons = editTemplateModal.querySelectorAll('.close-modal-button');
    const cancelFinalTxtModalButtons = viewFinalTxtModal.querySelectorAll('.close-modal-button');
    const noteToggleButtons = document.querySelectorAll('.toggle-notes');
    const pdfCheckboxesContainer = document.getElementById('pdfCheckboxesContainer'); // Added

    // --- Helper Functions ---
    function getElementValue(id) {
        const element = document.getElementById(id);
        return element ? element.value.trim() : '';
    }
    function getCheckedValuesArray(name) {
        const checked = document.querySelectorAll(`input[name="${name}"]:checked`);
        return Array.from(checked).map(cb => cb.value);
    }
    function getRadioValue(name) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : '';
    }
    function formatListWithCommasAndAnd(items, defaultText = '[N/A]') {
        if (!items || items.length === 0) { return defaultText; }
        if (items.length === 1) { return items[0]; }
        if (items.length === 2) { return `${items[0]} and ${items[1]}`; }
        const lastItem = items[items.length - 1];
        const otherItems = items.slice(0, -1);
        return `${otherItems.join(', ')}, and ${lastItem}`;
    }

    // --- Helper to process placeholders (SIMPLIFIED for County/NRCS dropdown) ---
    function processPlaceholders(text, placeholderStorage, selectedCounty, nrcsData) {
        // console.log("Processing text snippet:", text.substring(0, 100) + "...");
        const placeholderRegex = /\[\[(.*?)\]\]/g; // Match [[...]]
        let match;
        let processedText = text;
        let continueProcessing = true;
        const uniquePlaceholdersInThisText = new Map();

        // --- Step 1: Find all matches ---
        const matches = [];
        placeholderRegex.lastIndex = 0;
        while ((match = placeholderRegex.exec(text)) !== null) {
            matches.push({ full: match[0], innerTrimmed: match[1].trim() });
        }
        // if (matches.length > 0) console.log(`Found ${matches.length} placeholder matches.`);

        // --- Step 2: Determine values for all unique placeholders in this text block ---
        for (const matchInfo of matches) {
            const placeholderText = matchInfo.innerTrimmed;

            // Skip if already processed *for this specific text block*
            if (uniquePlaceholdersInThisText.has(placeholderText)) {
                continue;
            }

            let valueForThisBlock = null; // Value to use for replacement

            // --- Special Handling for County/Phone using the Dropdown Value ---
            if (placeholderText === "(Insert County Name)") {
                valueForThisBlock = selectedCounty || `[[${placeholderText}]]`; // Use selected county or keep placeholder
                // console.log(`Applying County value from dropdown: "${valueForThisBlock}"`);
            } else if (placeholderText === "(Insert NRCS Phone Number)") {
                if (selectedCounty && nrcsData.hasOwnProperty(selectedCounty)) {
                    valueForThisBlock = nrcsData[selectedCounty]; // Use lookup value
                    // console.log(`Applying Phone value from dropdown lookup: "${valueForThisBlock}"`);
                } else {
                    valueForThisBlock = `[[${placeholderText}]]`; // Keep placeholder if no county selected or county not found
                    // console.warn(`Cannot determine phone number. County selected: "${selectedCounty}"`);
                }
            } else {
                // --- Handle Generic Placeholders ---
                const storedGenericValue = placeholderStorage[placeholderText];
                // console.log(`Checking global storage for generic "${placeholderText}": Value = "${storedGenericValue}"`);

                if (storedGenericValue !== undefined && storedGenericValue !== null) {
                    valueForThisBlock = storedGenericValue;
                    // console.log(`Using stored value for generic "${placeholderText}": "${valueForThisBlock}"`);
                } else if (storedGenericValue === null) {
                    // This means a previous generic prompt for this was cancelled session-wide
                    console.warn(`Generic placeholder "${placeholderText}" previously cancelled globally. Cancelling block.`);
                    continueProcessing = false; // Cancel processing the entire block
                    break; // Exit the for loop
                } else {
                    // Prompt for generic placeholder
                    // console.log(`Prompting for generic placeholder: "${placeholderText}"`);
                    const userInput = prompt(`Please provide value for:\n"${placeholderText}"`);
                    if (userInput === null) {
                        console.warn(`User cancelled prompt for generic "${placeholderText}"`);
                        continueProcessing = false; // Cancel processing the entire block
                        // Optional: Store cancellation globally so it's not asked again this session
                        // placeholderStorage[placeholderText] = null;
                        break; // Exit the for loop
                    } else {
                        valueForThisBlock = userInput;
                        placeholderStorage[placeholderText] = valueForThisBlock; // Store globally
                        // console.log(`Stored value "${valueForThisBlock}" for generic "${placeholderText}" globally.`);
                    }
                }
            }
            // Store the determined value for this placeholder for this specific call
            uniquePlaceholdersInThisText.set(placeholderText, valueForThisBlock);

             // Break outer loop immediately if a cancellation happened inside
            if (!continueProcessing) break;
        }
        // console.log("Finished determining values. Continue Processing:", continueProcessing);
        // console.log("Values determined for this call:", uniquePlaceholdersInThisText);


        // --- Step 3: Replace placeholders if not cancelled ---
        if (continueProcessing) {
            // console.log("Entering replacement phase...");
            uniquePlaceholdersInThisText.forEach((userInput, placeholderText) => {
                // Replacement value is already determined in the map.
                // If it resolved to the placeholder itself (e.g. county not selected), it stays.
                const replacementValue = userInput; // Directly use the value from the map
                const escapedPlaceholderText = placeholderText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const specificPlaceholderRegex = new RegExp(`\\[\\[\\s*${escapedPlaceholderText}\\s*\\]\\]`, 'g');
                processedText = processedText.replace(specificPlaceholderRegex, replacementValue);
            });
            // console.log("--- processPlaceholders END (Success) ---");
            return { text: processedText, cancelled: false };
        } else {
            console.warn("--- processPlaceholders END (Cancelled by user prompt) ---");
            return { text: text, cancelled: true }; // Return original text and cancelled flag
        }
    }


    // --- Regenerate the recommendation textarea ---
    function regenerateRecTextarea() {
        // console.log("Regenerating textarea from selected titles:", selectedRecTitles);
        let output = [];
        let processingErrorOccurred = false; // Flag if any placeholder step fails during regeneration

        // Get the currently selected county from the dropdown *once*
        const currentSelectedCounty = nrcsCountySelect ? nrcsCountySelect.value : "";
        // console.log("Using County from dropdown:", currentSelectedCounty || "[Not Selected]");

        selectedRecTitles.forEach(title => {
            if (processingErrorOccurred) return;

            const originalText = flatRecList[title];
            if (originalText) {
                // Pass the selected county and NRCS data to the processor
                const { text: processedText, cancelled } = processPlaceholders(
                    originalText,
                    placeholderValues, // Global storage for generic placeholders
                    currentSelectedCounty,
                    countyNrcsInfo
                );

                if (!cancelled) {
                    output.push(processedText);
                } else {
                    // This typically means a generic prompt was cancelled during regeneration
                    console.error(`Placeholder processing cancelled during regeneration for "${title}". Removing item.`);
                    processingErrorOccurred = true;
                    const button = recButtonsContainer.querySelector(`.rec-button[data-title="${title}"]`);
                    if (button) button.classList.remove('selected');
                    // Update selectedRecTitles immediately within the loop might be tricky, filter after.
                }
            } else {
                console.warn(`Original text not found for title: "${title}" during regeneration.`);
            }
        });

        // If an error occurred (like cancellation), filter the master list based on button state
        if (processingErrorOccurred) {
            selectedRecTitles = selectedRecTitles.filter(title => {
                const button = recButtonsContainer.querySelector(`.rec-button[data-title="${title}"]`);
                // Keep only titles whose buttons are still marked as selected
                return button && button.classList.contains('selected');
            });
             console.log("Corrected selected titles after regeneration error:", selectedRecTitles);
        }

        recTextarea.value = output.join('\n\n');
        if(recTextarea.value) recTextarea.scrollTop = recTextarea.scrollHeight;
    }

    // --- Populate the County Dropdown ---
    function populateCountyDropdown() {
        if (!nrcsCountySelect) {
             console.warn("County select dropdown not found.");
             return;
        }

        // Clear existing options except the default disabled one
        while (nrcsCountySelect.options.length > 1) {
            nrcsCountySelect.remove(1);
        }

        Object.keys(countyNrcsInfo).sort().forEach(countyName => {
            const option = document.createElement('option');
            option.value = countyName;
            option.textContent = countyName;
            nrcsCountySelect.appendChild(option);
        });
         console.log("County dropdown populated.");
    }


    // --- Function to Populate PDF Checkboxes (WITH DOWNLOAD LINKS) ---
    function populatePdfCheckboxes() {
        if (!pdfCheckboxesContainer) {
            console.error("PDF checkbox container not found.");
            return;
        }
        pdfCheckboxesContainer.innerHTML = ''; // Clear existing
        referencePdfs.sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by filename

        referencePdfs.forEach(pdf => {
            const div = document.createElement('div');
            div.style.marginBottom = '5px'; // Add spacing between lines

            // Create Checkbox
            const safeIdValue = pdf.value.replace(/[^a-zA-Z0-9_-]/g, '_');
            const checkboxId = `pdf_${safeIdValue}`;
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = checkboxId;
            checkbox.name = 'referencePdf';
            checkbox.value = pdf.value; // Store the filename
            checkbox.style.marginRight = '5px';

            // Create Label
            const label = document.createElement('label');
            label.htmlFor = checkboxId;
            label.textContent = pdf.name; // Display filename
            label.style.marginRight = '10px';

            // Create Download Link
            const link = document.createElement('a');
            link.href = `pdfs/${pdf.value}`; // Relative path to the PDF
            link.textContent = '[Download]';
            link.target = '_blank'; // Open in new tab/window
            link.rel = 'noopener noreferrer'; // Security best practice for target="_blank"
            link.style.fontSize = '0.85em'; // Make link slightly smaller
            link.style.textDecoration = 'none';
            link.style.color = '#2E8B57'; // Theme color


            // Append elements to the div
            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(link); // Add the link after the label

            pdfCheckboxesContainer.appendChild(div);
        });
        console.log("PDF checkboxes with download links populated.");
    }

    // --- Function to Toggle Soil Details Visibility ---
    window.toggleSoilDetails = function(showOption1) {
        const details1 = document.getElementById('soilDetails1');
        const details2 = document.getElementById('soilDetails2');
        if (details1 && details2) {
            details1.style.display = showOption1 ? 'block' : 'none';
            details2.style.display = !showOption1 ? 'block' : 'none';
        }
    };
    // Initial call to set visibility based on any pre-selected radio
    const initialSoilOption = getRadioValue('soilOption');
    if (initialSoilOption === '1') { toggleSoilDetails(true); }
    else if (initialSoilOption === '2') { toggleSoilDetails(false); }
    else { // Default hide both if neither is selected
        const details1 = document.getElementById('soilDetails1');
        const details2 = document.getElementById('soilDetails2');
        if (details1) details1.style.display = 'none';
        if (details2) details2.style.display = 'none';
    }


    // --- Link Stocking Dropdown to Hidden Radio Buttons ---
    if (stockingLevelDropdown) {
        stockingLevelDropdown.addEventListener('change', () => {
            const selectedValue = stockingLevelDropdown.value;
            let targetRadioValue = '';
            if (selectedValue === 'fully') { targetRadioValue = 'Fully stocked'; }
            else if (selectedValue === 'over') { targetRadioValue = 'Over stocked'; }
            else if (selectedValue === 'under') { targetRadioValue = 'Under stocked'; }

            const radios = document.querySelectorAll(`#stockingExplanationRadios input[name="stockingExplanation"]`);
            let found = false;
            radios.forEach(radio => {
                if (radio.value === targetRadioValue) {
                    radio.checked = true;
                    found = true;
                } else {
                    radio.checked = false;
                }
            });
             if (!found) { // If value is empty ensure all are unchecked
                  radios.forEach(radio => radio.checked = false);
             }
        });
        // Trigger change on load to set initial state
        stockingLevelDropdown.dispatchEvent(new Event('change'));
    }

    // --- Collapsible Notes Sections Logic ---
    noteToggleButtons.forEach(button => {
        const textarea = button.closest('.collapsible-section').querySelector('.notes-textarea');
        if (textarea) {
             // Simplified: Always start closed unless specifically styled otherwise via CSS
             textarea.style.display = 'none';
             button.textContent = '+';
        }
        button.addEventListener('click', () => {
            const section = button.closest('.collapsible-section');
            const txtArea = section.querySelector('.notes-textarea');
            if (txtArea) {
                const isHidden = txtArea.style.display === 'none' || !txtArea.style.display;
                txtArea.style.display = isHidden ? 'block' : 'none';
                button.textContent = isHidden ? '−' : '+';
            }
        });
        const label = button.closest('.collapsible-header').querySelector('label');
        if (label) {
            label.style.cursor = 'pointer';
            label.addEventListener('click', () => button.click()); // Make label trigger button click
        }
    });

    // --- Populate Recommendation Buttons and Handle Clicks ---
    function populateRecommendationButtons() {
        // Check if allRecommendations is defined before proceeding
        if (typeof allRecommendations === 'undefined' || !allRecommendations || Object.keys(allRecommendations).length === 0) {
             console.warn("WARNING: The 'allRecommendations' object is empty or not defined. Recommendation buttons cannot be created.");
             if(recButtonsContainer) { recButtonsContainer.innerHTML = '<p style="color: orange; font-weight: bold;">No recommendations available.</p>'; }
             flatRecList = {}; // Ensure flat list is empty
             return; // Stop execution of this function
        }

        if (!recButtonsContainer) return;
        recButtonsContainer.innerHTML = '';

        // Populate flatRecList with original texts
        flatRecList = {}; // Reset
        Object.values(allRecommendations).forEach(categoryRecs => {
            if (Array.isArray(categoryRecs)) { // Ensure it's an array
                categoryRecs.forEach(rec => {
                    if (rec && rec.title) { // Check if rec and title exist
                        flatRecList[rec.title] = rec.text || ''; // Use empty string if text is missing
                    } else {
                        console.warn("Found recommendation object without title:", rec);
                    }
                });
            }
        });


        for (const category in allRecommendations) {
            if (!Array.isArray(allRecommendations[category]) || allRecommendations[category].length === 0) continue; // Skip empty categories

            const categoryHeader = document.createElement('h4');
            categoryHeader.textContent = category;
            categoryHeader.classList.add('rec-category-header', 'expanded'); // Start expanded

            const buttonGroup = document.createElement('div');
            buttonGroup.classList.add('rec-button-group');
            // Start expanded - if you want them collapsed by default, add style="display: none;" here
            buttonGroup.style.display = 'flex';


            allRecommendations[category].forEach(rec => {
                if (!rec || !rec.title) return; // Skip if recommendation or title is missing

                const button = document.createElement('button');
                button.type = 'button';
                button.classList.add('rec-button');
                button.textContent = rec.title;
                button.dataset.title = rec.title;
                button.title = rec.text || 'No description available'; // Hover tooltip
                if (selectedRecTitles.includes(rec.title)) button.classList.add('selected');
                buttonGroup.appendChild(button);
            });

            // Add click listener for collapsing/expanding
            categoryHeader.addEventListener('click', function() {
                const group = this.nextElementSibling;
                if (group && group.classList.contains('rec-button-group')) {
                     const isCurrentlyExpanded = this.classList.contains('expanded');
                     if (isCurrentlyExpanded) {
                         group.style.display = 'none';
                         this.classList.remove('expanded');
                     } else {
                         group.style.display = 'flex';
                         this.classList.add('expanded');
                     }
                 }
            });

            recButtonsContainer.appendChild(categoryHeader);
            recButtonsContainer.appendChild(buttonGroup);
        }

        // Add event listener using delegation for buttons
        recButtonsContainer.addEventListener('click', (event) => {
            const targetButton = event.target;
            if (targetButton.classList.contains('rec-button')) {
                const title = targetButton.dataset.title;
                const isSelected = targetButton.classList.contains('selected');

                if (isSelected) {
                    // --- DESELECTING ---
                    // console.log(`Deselecting: "${title}"`);
                    targetButton.classList.remove('selected');
                    selectedRecTitles = selectedRecTitles.filter(t => t !== title);
                    regenerateRecTextarea();
                } else {
                    // --- SELECTING ---
                    // console.log(`Selecting: "${title}"`);
                    const originalText = flatRecList[title];
                    if (originalText !== undefined) { // Check if exists, even if empty
                        // Add title to the ordered list
                        if (!selectedRecTitles.includes(title)) selectedRecTitles.push(title);
                        targetButton.classList.add('selected');
                        // Regenerate - this will process placeholders including any potential *new* generic prompts
                        regenerateRecTextarea();

                        // Check if regeneration caused this button to become deselected (due to generic prompt cancel)
                        if (!targetButton.classList.contains('selected')) {
                             console.log(`Selection cancelled for "${title}" during regeneration (likely generic prompt cancelled).`);
                              targetButton.style.backgroundColor = '#f8d7da'; // Optional feedback
                              setTimeout(() => { targetButton.style.backgroundColor = ''; }, 800);
                         }
                    } else {
                        console.warn(`Original text not found for title: "${title}"`);
                    }
                }
            }
        });
    }

    // --- Initial Population Calls ---
    populateCountyDropdown();
    populateRecommendationButtons();
    populatePdfCheckboxes(); // <-- Call the new function here

    // --- Text File Generation and Download Logic ---
    function generateFinalText() {
        const data = {
            // --- Keep all existing form field values ---
            area: getElementValue('area'),
            acres: getElementValue('acres'),
            majorSpecies: getElementValue('majorSpecies'),
            selectedSizeClasses: getCheckedValuesArray('sizeClass'),
            stockingLevel: getElementValue('stockingLevel'),
            selectedStockingExplanation: getRadioValue('stockingExplanation'),
            treesPerAcre: getElementValue('treesPerAcre'),
            avgDbh: getElementValue('avgDbh'),
            basalArea: getElementValue('basalArea'),
            standHealth: getElementValue('standHealth'),
            invasiveSpecies: getElementValue('invasiveSpecies'),
            healthNotes: getElementValue('healthNotes'),
            timberQuality: getElementValue('timberQuality'),
            qualityNotes: getElementValue('qualityNotes'),
            regenSpecies: getElementValue('regenSpecies'),
            whiteOakHeight: getElementValue('whiteOakHeight'),
            blackOakSI: getElementValue('blackOakSI'),
            yellowPoplarSI: getElementValue('yellowPoplarSI'),
            siteProductivity: getElementValue('siteProductivity'),
            soilOption: getRadioValue('soilOption'),
            soilType: getRadioValue('soilOption') === '1' ? getElementValue('soilType1') : getElementValue('soilType2'),
            drainage: getRadioValue('soilOption') === '1' ? getElementValue('drainage1') : getElementValue('drainage2'),
            runoff: getRadioValue('soilOption') === '1' ? getElementValue('runoff1') : getElementValue('runoff2'),
            permeability: getRadioValue('soilOption') === '1' ? getElementValue('permeability1') : getElementValue('permeability2'),
            lastHarvestAge: getElementValue('lastHarvestAge'),
            historyNotes: getElementValue('historyNotes'),
            wildlifeValue: getRadioValue('wildlifeSuitability'),
            finalRecommendations: recTextarea.value.trim() || '[No recommendations added.]', // Still get from textarea

            // --- Add selected PDFs ---
            selectedPdfNames: getCheckedValuesArray('referencePdf') // Get filenames from checked values
        };

        // --- Build composite text sections ---
        data.sizeClassText = formatListWithCommasAndAnd(data.selectedSizeClasses, '[No size class selected]');
        data.stockingExplanationText = data.selectedStockingExplanation
            ? (stockingExplanationDescriptions[data.selectedStockingExplanation] || data.selectedStockingExplanation)
            : '[No stocking explanation selected]';
        if (data.soilOption === '1') { data.soilSectionText = `The primary soil type in this area is ${data.soilType || '[N/A]'}. This soil type is ${data.drainage || '[N/A]'} drained with ${data.runoff || '[N/A]'} runoff and ${data.permeability || '[N/A]'} permeability.`; }
        else if (data.soilOption === '2') { data.soilSectionText = `The primary soil types in this area are ${data.soilType || '[N/A]'}. This soil type is ${data.drainage || '[N/A]'} drained with ${data.runoff || '[N/A]'} runoff and ${data.permeability || '[N/A]'} permeability.`; }
        else { data.soilSectionText = '[No soil option selected]'; }
        data.wildlifeSectionText = data.wildlifeValue
            ? (wildlifeDescriptions[data.wildlifeValue] || data.wildlifeValue)
            : '[No wildlife condition selected]';
        data.invasiveTreatmentNote = data.invasiveSpecies ? "Invasive species should be treated as soon as feasible and the area monitored for additional spread." : "";

        // Format selected PDFs list for the template
        if (data.selectedPdfNames && data.selectedPdfNames.length > 0) {
            // Use the actual filenames, prefixed with a bullet
            data.selectedPdfs = data.selectedPdfNames.map(filename => `• ${filename}`).join('\n');
        } else {
            data.selectedPdfs = '[None Selected]';
        }

        // --- Template substitution logic ---
        let finalText = baseTemplate;
        const replacePlaceholder = (text, key, value, defaultValue = '[N/A]') => {
             const regex = new RegExp(`\\$\\{\\s*${key}\\s*(\\|\\|.*?)?\\s*\\}`, 'g');
             const useValue = (value !== undefined && value !== null);
             // Adjust allowEmpty list if necessary
             const allowEmpty = ['healthNotes', 'qualityNotes', 'historyNotes', 'invasiveTreatmentNote', 'finalRecommendations', 'selectedPdfs'].includes(key);
             let replacement = defaultValue;
             if (useValue) {
                 if (allowEmpty || value !== '') { replacement = value; }
             } else if (allowEmpty) { replacement = ''; }
             // Provide specific default for selectedPdfs if it's empty/null and not caught above
             if (key === 'selectedPdfs' && !replacement && defaultValue === '[N/A]') {
                  replacement = '[None Selected]';
             }
             // Ensure boolean false is replaced correctly if needed for some future placeholder
             if (value === false) {
                 replacement = 'false';
             }
             return text.replace(regex, replacement);
         };

        // Loop through data keys, excluding the raw PDF names array and composite source fields
        Object.keys(data).forEach(key => {
            if (!['selectedSizeClasses', 'selectedStockingExplanation', 'soilOption', 'soilType', 'drainage', 'runoff', 'permeability', 'wildlifeValue', 'selectedPdfNames'].includes(key)) {
                finalText = replacePlaceholder(finalText, key, data[key]);
            }
        });
        // Replace composite fields specifically
        finalText = replacePlaceholder(finalText, 'sizeClassText', data.sizeClassText, '[No size class selected]');
        finalText = replacePlaceholder(finalText, 'stockingExplanationText', data.stockingExplanationText, '[No stocking explanation selected]');
        finalText = replacePlaceholder(finalText, 'soilSectionText', data.soilSectionText, '[No soil option selected]');
        finalText = replacePlaceholder(finalText, 'wildlifeSectionText', data.wildlifeSectionText, '[No wildlife condition selected]');
        finalText = replacePlaceholder(finalText, 'invasiveTreatmentNote', data.invasiveTreatmentNote, '');
        finalText = replacePlaceholder(finalText, 'selectedPdfs', data.selectedPdfs, '[None Selected]'); // Ensure this gets replaced

        // Catch any remaining placeholders that might have failed replacement or have default values
        finalText = finalText.replace(/\$\{\s*area\s*(\|\|.*?)?\s*\}/g, data.area || '[N/A]');
        finalText = finalText.replace(/\$\{\s*acres\s*(\|\|.*?)?\s*\}/g, data.acres || '[N/A]');
        // ... add similar lines for other critical placeholders if defaults aren't working ...
        // General fallback for any missed placeholders
        finalText = finalText.replace(/\$\{\s*\w+\s*(\|\|.*?)?\s*\}/g, '[N/A]');

        finalText = finalText.trim();
        return finalText;
    }


    // --- Download and Filename Functions ---
    function downloadTextFile(content, filename) {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
    function generateFilename() {
        const area = getElementValue('area') || 'NoArea';
        const safeArea = area.replace(/[^a-zA-Z0-9_-]/g, '_');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-').replace('T', '_');
        return `forestry_plan_${safeArea}_${timestamp}.txt`;
    }

    // --- Modal Handling ---
    function openModal(modalElement) { if (modalElement) modalElement.style.display = 'block'; }
    function closeModal(modalElement) { if (modalElement) modalElement.style.display = 'none'; }

    // --- Event Listeners for Main Action Buttons ---
    if(editTemplateButton) {
        editTemplateButton.addEventListener('click', () => {
            if(templateEditTextarea) templateEditTextarea.value = baseTemplate;
            openModal(editTemplateModal);
        });
    }
    if(viewFinalTxtButton) {
        viewFinalTxtButton.addEventListener('click', () => {
            // regenerateRecTextarea(); // Ensure recommendation text is up-to-date before viewing final TXT
            const finalText = generateFinalText(); // Regenerate the FULL final text
            if(finalTxtEditTextarea) finalTxtEditTextarea.value = finalText;
            openModal(viewFinalTxtModal);
        });
    }
    if(submitButton) {
        submitButton.addEventListener('click', () => {
            // regenerateRecTextarea(); // Ensure recommendation text is up-to-date before saving
            const finalText = generateFinalText(); // Regenerate the FULL final text
            const filename = generateFilename();
            downloadTextFile(finalText, filename);
        });
    }

    // --- Event Listeners for Modals ---
    if(saveTemplateChangesButton) {
        saveTemplateChangesButton.addEventListener('click', () => {
            if(templateEditTextarea) baseTemplate = templateEditTextarea.value;
            console.log("Base template updated.");
            closeModal(editTemplateModal);
        });
    }
    if(saveFinalTxtButton) {
        saveFinalTxtButton.addEventListener('click', () => {
            const editedText = finalTxtEditTextarea ? finalTxtEditTextarea.value : '';
            const filename = generateFilename();
            downloadTextFile(editedText, filename);
            closeModal(viewFinalTxtModal);
        });
    }
    if(closeTemplateModalButton) closeTemplateModalButton.addEventListener('click', () => closeModal(editTemplateModal));
    if(closeFinalTxtModalButton) closeFinalTxtModalButton.addEventListener('click', () => closeModal(viewFinalTxtModal));
    cancelTemplateModalButtons.forEach(btn => btn.addEventListener('click', () => closeModal(editTemplateModal)));
    cancelFinalTxtModalButtons.forEach(btn => btn.addEventListener('click', () => closeModal(viewFinalTxtModal)));

    // Close modal if clicking outside the content area
    window.addEventListener('click', (event) => {
        if (event.target == editTemplateModal) closeModal(editTemplateModal);
        if (event.target == viewFinalTxtModal) closeModal(viewFinalTxtModal);
    });

    // --- Event Listener for County Dropdown Change ---
    if (nrcsCountySelect) {
        nrcsCountySelect.addEventListener('change', () => {
            console.log("County selection changed. Regenerating recommendations.");
            regenerateRecTextarea(); // Regenerate text area when county changes
        });
    }

}); // End DOMContentLoaded
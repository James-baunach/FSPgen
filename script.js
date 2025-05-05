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

    // --- Base Template Definition ---
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

    // --- List of Reference PDFs ---
    const referencePdfs = [
        { name: "Reference A - Large", value: "Reference A - Large.pdf" },
        { name: "Reference A - Smalls", value: "Reference A - Smalls.pdf" },
        { name: "Reference B - TSI Application Methods", value: "Reference B - TSI Application Methods.pdf" },
        { name: "General Planting", value: "General Planting.pdf" },
        { name: "Tree-of-heaven", value: "Tree-of-heaven.pdf" },
        { name: "Edge Feathering", value: "Edge Feathering.pdf" },
        { name: "Wildflowers", value: "Wildflowers.pdf" },
        { name: "Pruning Trees", value: "Pruning Trees.pdf" },
        { name: "Multiflora Rose", value: "Multiflora Rose.pdf" },
        { name: "Paulownia", value: "Paulownia.pdf" },
        { name: "Chinese Privet", value: "Chinese Privet.pdf" },
        { name: "Bush Honeysuckle", value: "Bush Honeysuckle.pdf" },
        { name: "Japanese Stiltgrass", value: "Japanese Stiltgrass.pdf" },
        { name: "Callery Pear", value: "Callery Pear.pdf" },
        { name: "Winter Creeper", value: "Winter Creeper.pdf" },
        { name: "Oriental Bittersweet", value: "Oriental Bittersweet.pdf" },
        { name: "Cool Season Grasses", value: "Cool Season Grasses.pdf" },
        { name: "Cropland Management", value: "Cropland Management.pdf" },
        { name: "Food Plots", value: "Food Plots.pdf" },
        { name: "Forest Openings", value: "Forest Openings.pdf" },
        { name: "Forest Regeneration", value: "Forest Regeneration.pdf" },
        { name: "Grass and Grain Seed Rate", value: "Grass and Grain Seed Rate.pdf" },
        { name: "Planting Trees and Shrubs", value: "Planting Trees and Shrubs.pdf" },
        { name: "Streamside Management", value: "Streamside Management.pdf" },
        { name: "Timber Stand Improvement", value: "Timber Stand Improvement.pdf" },
        { name: "Warm Season Grasses", value: "Warm Season Grasses.pdf" },
    ];

    // --- Structured Canned Recommendations ---
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
                text: `(Specific Native Pest/Disease Concern)\nSigns consistent with [[Name specific disease/pest, e.g., Hypoxylon canker on oaks, bacterial leaf scorch on elm/sycamore, sassafras wilt]] were observed in this area.\n•\tMonitoring: Monitor the affected trees and surrounding area for spread or further decline. Take photos if possible.\n•\tManagement: For [[Disease/Pest Name]], management often involves [[Briefly describe typical management, e.g., removing severely infected trees to reduce spread (if applicable), improving stand vigor through thinning, or allowing the stand to develop naturally]]. Contact KDF or UK Forestry Extension for specific diagnosis confirmation and current management recommendations if the problem appears significant or is worsening.`
            }
        ],
        "INVASIVE SPECIES CONTROL": [
            {
                title: "(Invasive Species – General)",
                text: `(Invasive Species – General)\nControl treatments of [[(Name specific species, e.g., tree-of-heaven, royal paulownia, bush honeysuckle, Chinese privet, Japanese stiltgrass, etc.)]] should be completed as soon as feasible to prevent further spread and negative impacts to desired regeneration and native plant communities. Crucially, treat existing invasive species before major disturbances like timber harvesting or significant TSI to prevent their rapid expansion into newly opened areas. This area will likely need monitoring and follow-up treatments for several years. Herbicides applied to foliage, bark, or frill cuts on the stem are effective for controlling various invasive species. For most treatments, herbicides containing the active ingredients glyphosate or triclopyr are recommended.\n\nPlease see Reference B for additional details on invasive species treatment and application methods. Also included are publications with example treatment guides for [[List specific guides included, e.g., tree-of-heaven, bush honeysuckle]].\n\nBe sure to read and follow all herbicide label instructions. The label is the law. Adherence to the label will ensure protection of you and the environment, will ensure efficient use of your time and resources, and will ensure attainment of your management objectives. Always use appropriate Personal Protective Equipment (PPE).\n\nThe Kentucky Division of Forestry offers a free marking service where we mark undesirable invasive trees/shrubs for removal/treatment. Cost share funding is often available to complete these types of practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service (NRCS) office in [[Insert County Name]] County at [[Insert NRCS Phone Number]] for more information on eligibility.`
            },
            {
                title: "(Control tree-of-heaven)",
                text: `(Control tree-of-heaven)\nEradication of tree-of-heaven (Ailanthus altissima) is a top priority due to its extreme invasiveness. It spreads rapidly via seeds and root sprouts, displacing native species. Control requires systemic herbicides; cutting alone causes prolific sprouting.\nRecommended Methods:\n•\tHack and Squirt / Frill Girdle: Best for larger trees to minimize root suckering. Use a hatchet for spaced, downward-angled cuts/hacks around the trunk. Immediately apply concentrated herbicide (glyphosate or triclopyr amine, 50-100%) into cuts. Use 1 hack per 1-2 inches diameter (min. 2). Most effective July-November.\n•\tBasal Bark Treatment: Effective on all sizes due to thin bark. Use triclopyr ester (20-25% solution) mixed with basal oil/diesel. Spray the lower 12-18 inches of the entire stem circumference until wet. Can be done year-round (avoid extreme heat). Often results in fewer root sprouts than other methods.\n•\tFoliar Spray: For seedlings <4 ft tall. Use glyphosate (2-5% solution) or triclopyr amine (2-3%) in water with surfactant. Thoroughly wet leaves during the active growing season (July-November).\nAVOID: Cut-stump treatment is not recommended as it strongly encourages root suckering.\nFollow-up: Essential for multiple years to treat sprouts and new seedlings.`
            },
            {
                title: "(Control Royal Paulownia)",
                text: `(Control Royal Paulownia)\nControl of Royal Paulownia (Paulownia tomentosa) is critical. It grows extremely rapidly and outcompetes native vegetation, especially after disturbance.\nRecommended Methods: Similar to tree-of-heaven, systemic herbicides are needed.\n•\tHack and Squirt / Frill Girdle: Effective for larger trees (July-November).\n•\tBasal Bark Treatment: Effective on saplings/poles (year-round, avoid heat).\n•\tCut Stump Treatment: Viable for Paulownia (less prone to root suckering than ToH). Cut low and immediately treat the stump edge (cambium) with concentrated glyphosate or triclopyr amine (most effective late summer/fall).\n•\tFoliar Spray: For seedlings <4 ft (July-November).\nFollow-up: Necessary for several years to control sprouts and seedlings. Control before harvest.`
            },
            {
                title: "(Foliar Treatment)",
                text: `(Foliar Treatment)\nTo treat [[Specify low-growing species/resprouts, e.g., Japanese Honeysuckle, Multiflora Rose, young Privet/Bush Honeysuckle, Stiltgrass]], a foliar herbicide application is recommended. Apply between July and November (before leaf color change/hard frost) when plants are actively growing. Use a solution of glyphosate or triclopyr amine (approx. 2-3%) in water with a surfactant (unless included in the formulation). Ensure thorough coverage of foliage, ideally spraying below waist height to minimize non-target drift. Check herbicide label for specific rates and compatible surfactants. Consider late fall/early spring applications for semi-evergreen species like honeysuckle to minimize impact on dormant native plants.`
            },
            {
                title: "(Basal Bark Treatment)",
                text: `(Basal Bark Treatment)\nTo treat woody invasive stems (typically <6 inches diameter) like [[Specify species, e.g., tree-of-heaven, Chinese privet, callery pear, Autumn Olive]] a basal bark treatment is effective. Mix a triclopyr ester formulation (check label for oil solubility, typically 60%+ active ingredient) with a carrier oil (basal oil, diesel fuel, kerosene, or methylated seed oil) usually at a concentration of 20-25% herbicide (e.g., 1 part herbicide to 3-4 parts oil). Check the label for specific mixing rates. Thoroughly spray the mixture around the entire circumference of the lower 12-18 inches of the stem, wetting the bark to the point of runoff but not puddling. This method can often be applied year-round, but avoid extreme heat or when snow/water prevents reaching the stem base.`
            },
            {
                title: "(Cut Stump Treatment)",
                text: `(Cut Stump Treatment)\nTo treat stumps of cut invasive shrubs or trees like [[Specify species, e.g., Privet, Bush Honeysuckle, Multiflora Rose, Mimosa]] and prevent resprouting, use a cut-stump treatment. Cut the stem close to the ground (within a few inches). Immediately (within minutes if possible) apply a concentrated herbicide solution (glyphosate 50-100% or triclopyr amine 50-100%) directly to the cut surface, ensuring coverage of the outer edge (cambium layer). A spray bottle or dauber can be used. This method is effective most times of the year but avoid periods of heavy sap flow (late winter/early spring). (Note: Generally avoid cut-stump for tree-of-heaven due to potential for increased root suckering).`
            },
            {
                title: "(Hack and Squirt / Frill Girdle Treatment)",
                text: `(Hack and Squirt / Frill Girdle Treatment)\nTo treat larger invasive trees, especially tree-of-heaven or royal paulownia, while minimizing root suckering, use a hack-and-squirt or frill girdle treatment. Use a hatchet to make continuous or spaced downward-angled cuts (frill) or hacks into the sapwood around the circumference of the tree at a convenient height. Do not cut so deeply or continuously as to completely girdle the tree mechanically if using spaced hacks. Immediately apply a concentrated herbicide (glyphosate or triclopyr amine, often 50-100% concentration) into the cuts until the exposed wood is saturated. Spacing is typically one hack per 1-2 inches of diameter, with a minimum of two. This method is most effective from mid-summer through early fall (July-November).`
            }
        ],
        "TIMBER STAND IMPROVEMENT (TSI)": [
            {
                title: "(Crop Tree Release - TSI General)",
                text: `(Crop Tree Release - TSI General)\nThis area would benefit from a crop tree release timber stand improvement (TSI) practice. This TSI would focus on locating desirable native species (crop trees) with good form and releasing them from competition by removing adjacent competing trees (typically on 2-4 sides of the crop tree's crown). Competing trees selected for removal often include damaged, diseased, poor form, lower-value, or undesirable species that are overtopping or crowding the chosen crop trees. Eliminating this competition will open up the canopy, providing more sunlight, water, and nutrients, thereby improving the growth, vigor, and mast production of the desired crop trees and enhancing the overall quality and value of the future stand.\n\nReference B attached details different Timber Stand Improvement application methods (felling, girdling, hack-and-squirt). Herbicide use is often necessary for effective control of sprouting species.\n\nThe Kentucky Division of Forestry offers a free timber stand improvement marking service where we mark the undesirable trees to be removed. Cost share funding is often available to complete these types of TSI practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service office in [[(Insert County Name)]] County at [[(Insert NRCS Phone Number) ]] for more information on eligibility.`
            },
            {
                title: "(Advanced Oak Regen TSI / Suppressed Oak Release)",
                text: `(Advanced Oak Regen TSI / Suppressed Oak Release)\nThis stand contains promising advanced oak and/or hickory regeneration (seedlings/saplings >4.5 ft tall) or pole-sized trees that are currently being suppressed by less desirable competing species such as [[Specify competing species, e.g., maple, beech, yellow-poplar, elm, eastern redcedar]]. A crop tree release TSI is recommended, specifically targeting the removal of competitors around these desirable oak/hickory stems. Releasing these stems now is crucial to ensure their survival and recruitment into the main canopy, preventing them from being shaded out over time and maintaining the hard mast component of the forest.`
            },
            {
                title: "(Rehabilitating High-Graded / Poorly Managed Stands)",
                text: `(Rehabilitating High-Graded / Poorly Managed Stands)\nPast harvesting practices (e.g., diameter-limit cutting, high-grading) or lack of management has resulted in a stand condition characterized by [[Describe issues, e.g., dominance of low-quality trees, undesirable species like beech/maple, poor structure, lack of desirable regeneration]]. Rehabilitation will require deliberate effort.\n\nPrioritize control of any invasive species present. Implement Timber Stand Improvement (TSI) focusing on removing the poorest quality residual trees, cull stems, and undesirable species to release any existing trees with potential (even if few). Evaluate the need for underplanting desirable species (like oak) in canopy gaps if natural regeneration is inadequate. Recognize that restoring productivity and desirable composition may be a long-term process.`
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
                text: `(Let Grow - Cedar Dominated Stand)\nThis area is predominantly eastern redcedar, typical of old-field succession. No active management is required at this time. If left undisturbed, hardwood species present in the understory or seeding in will eventually overtop the cedar/pine, and the stand will gradually transition towards a mixed hardwood forest over several decades. You could cut cedar/pine for personal use (e.g., fence posts, firewood) if desired. This stand provides valuable thermal cover for wildlife. Consider having a forester re-inspect this area in every 10 years to determine if management actions like thinning or releasing desirable hardwoods are warranted. Monitor for invasive species.`
            },
            {
                title: "(Let Grow – Maturing Stand / No Harvest Recommended Now)",
                text: `(Let Grow – Maturing Stand / No Harvest Recommended Now)\nThe timber in this area is developing well and shows no signs of significant health decline or widespread stagnation. While some trees may be approaching merchantable size, allowing the stand to continue growing until a majority of the timber reaches the medium (18-23” DBH) and large (24”+ DBH) sawtimber size classes will significantly increase overall volume and value. A commercial harvest is not recommended at this time. Reevaluate this area's condition and market potential every [[5 or 10]] years to determine the appropriate timing for a future selective harvest or other management actions. Continue monitoring for invasive species.`
            },
             {
                title: "(Reevaluate in 5 Years for Thinning/TSI)",
                text: `(Reevaluate in 5 Years for Thinning/TSI)\nThis stand is currently densely stocked [[or describe condition, e.g., heavy understory vegetation post-harvest]] and would likely benefit from a thinning or TSI practice in the near future. However, immediate treatment may be impractical or less effective due to [[Reason, e.g., dense understory, recent disturbance, trees slightly too small for optimal crop tree selection]]. Allow the stand to develop for another 5 years and have it reevaluated. This should allow the canopy to differentiate further or for post-harvest vegetation to subside somewhat, making it easier and more effective to identify crop trees and implement TSI.`
            }
        ],
        "TIMBER HARVESTING": [
            {
                title: "(Selective Harvest Recommendation)",
                text: `(Selective Harvest Recommendation)\nThis area contains mature timber and is suitable for a selective harvest. A professionally marked selective harvest should be conducted, targeting trees that are biologically mature or over-mature, showing signs of decline, disease, or significant damage, and trees of lower quality or undesirable species competing with higher-value crop trees.\nThe harvest should aim to maintain appropriate stand density, release promising future crop trees, improve overall stand health and composition, and generate income. A well-executed selective harvest will leave a residual stand with a varied size class distribution and sufficient high-quality trees for future growth and harvests (typically planned 20-30 years later). Invasive species should be treated prior to harvest. Post-harvest TSI is highly recommended.`
            },
            {
                title: "(Cedar/Pine Harvest Recommendation)",
                text: `(Cedar/Pine Harvest Recommendation)\nMerchantable [[eastern redcedar / Virginia pine / Loblolly pine]] should be harvested from this area. This species often colonizes old fields and may now be mature or declining, potentially hindering the development of more desirable native hardwoods underneath. Harvesting the cedar/pine will utilize this resource, increase sunlight to the forest floor, and release existing hardwood regeneration (oaks, hickories, etc., if present) or create conditions favorable for establishing new hardwood seedlings. This accelerates the natural transition to a hardwood-dominated forest. Wildlife may benefit from the resulting early successional habitat. I have supplied a list of potential timber buyers. Post-harvest TSI may be beneficial for managing the remaining hardwoods.`
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
                text: `(General Tree Planting Recommendation)\nPlanting trees is recommended for this open area to [[State goals, e.g., establish forest cover, improve wildlife habitat, protect soil and water quality, produce future timber, create a windbreak]].\n•\tSite Preparation: Control existing competing vegetation (especially sod-forming grasses like fescue) before planting. This is critical for seedling survival. Methods include mechanical tillage (plowing/disking) or herbicide application (e.g., glyphosate or sulfometuron-methyl based products) applied as broadcast or strips/spots). Follow label directions carefully. See the "Example Planting Schedule" handout for detailed options and timing.\n•\tSpecies Selection: Choose high-quality nursery stock appropriate for the site's soil type, moisture regime, and sunlight conditions, matching your management goals. For timber, consider oaks, walnut, yellow-poplar (on good sites). For wildlife, include a mix of hard mast (oaks, hickory) and soft mast (persimmon, plum, dogwood) producers. For bottomlands, use flood-tolerant species (e.g., swamp white oak, pin oak, river birch, sycamore). Consult your forester for specific species recommendations.\n•\tSeedling Source: Order seedlings well in advance (typically in the fall for spring planting) from reputable sources like the Kentucky Division of Forestry State Nursery or private nurseries specializing in regional genetics.\n•\tSpacing: Common spacing is 8'x8' (680 trees/acre), 10'x10' (436 trees/acre), or 12'x6' (605 trees/acre). Wider spacing requires less thinning later but may result in poorer initial tree form. Closer spacing allows for more crop tree selection but requires earlier management.\n•\tPlanting Technique: Plant seedlings during the dormant season (typically January through April). Use proper planting techniques (hand planting with a dibble bar/shovel or machine planting) ensuring the hole is adequate, roots are oriented naturally (not J-rooted), the root collar is at ground level, and soil is firmly packed around the roots. Keep roots moist before planting. See the "Proper Planting Technique" flyer.\n•\tMaintenance: Control competing weeds around seedlings for the first 2-5 years. This can be done through mowing between rows (timing mowing to avoid nesting season - May 15-July 15), targeted herbicide applications around seedlings (using shields or directed spray), or mulching. Protect seedlings from deer browse or rodent damage using tree shelters or repellents if significant damage occurs.\nCost share funding is often available to complete these types of practices through the Environmental Quality Incentives Program (EQIP). You can contact the Natural Resources Conservation Service (NRCS) office in [[Insert County Name]] County at [[Insert NRCS Phone Number]] for more information on eligibility.`
            },
            {
                title: "(Example Planting Schedule)",
                text: `(Example Planting Schedule)\nEXAMPLE SCHEDULE:\nA.\tHerbicide between August and November \n•\tMow the fescue field.\n•\tAllow the grass to re-grow 4-6 inches.\n•\tStrip-spray the field with an herbicide. Your trees will be planted inside the strips (where the grass has been killed) in the spring.\n\nB.\tHerbicide between February and April, and either\n•\tStrip-spray the field. Wait until the grass begins to turn brown. Plant your trees inside the brown rows. \n•\tOr plant your trees at the correct spacing and before the trees begin to leaf out, spray herbicide along the rows of trees. If this is done after the leaves are on the trees, the trees will be killed.\nBetween January and April\n•\tPlant your trees at the recommended spacing.\n•\tIf you have used the strip-spraying method of herbicide treatment from the beginning, then you should be able to find your rows of trees very easily going forward. However, if you are planting trees in an old crop-field, or if you treat the entire planting area with herbicide, you should try to mark the location of each row of trees. Tree seedlings can be very small, and weeds grow very quickly. It's easy to lose your rows in a field of tall weeds.\nOptional: Seeding clover in rows\n•\tYou may choose to sow clover into your rows before you plant your trees. Many landowners have found that clover growing very thick in their tree rows decreases the number of weeds. And the clover, which is a legume, increases the nitrogen content in the soil, which benefits the trees.\n•\tWhether you choose white or red clover, it is generally recommended that clover be planted either between February 1 and April 15 or between August 1 and September 10. Make sure that your seeding rates and your chosen planting technique are appropriate for your site and for the equipment available to you.\n1 to 2 months after planting\n•\tUsing an appropriate herbicide, spot-spray trouble areas of grass and/or weeds.\n•\tIf you only have a grass problem near your tree seedlings, use an herbicide formulated to kill the grasses but not the trees, such as Poast or Vantage.\nREAD THE LABEL!\nAlthough the Kentucky Division of Forestry makes recommendations concerning herbicide use, you should always consult a licensed chemical supplier before purchasing and/or using any chemical. And be sure to first read and understand the product label.\nFrom the time of planting to 2 - 3 years after planting\n•\tMow between your rows of trees periodically. This should be done throughout the growing season, about every month (more or less, depending on the growth of the competition).\n•\tBe certain that you only mow between your rows of trees. If you mow down your trees because you didn't know where they were planted, the cost of reestablishment will fall to you.\n•\tOnce your trees are taller than the surrounding vegetation, they are considered to be "established". At that point, they will require very little maintenance. You should mow between your rows of trees only once every two years.`
            }
        ],
        "OTHER MANAGEMENT PRACTICES & CONSIDERATIONS": [
             {
                title: "(Protect from Grazing / Livestock Exclusion)",
                text: `(Protect from Grazing / Livestock Exclusion)\nWoodlands should be protected from livestock grazing. Livestock compact the soil (reducing water infiltration and root growth), physically damage tree roots and bases (allowing entry for decay), browse or trample desirable tree regeneration, and can increase erosion potential. Fencing is required to exclude livestock. If shade for livestock is needed, designate a specific, limited area or establish silvopasture practices separately from high-quality woodlands. Cost-share assistance for fencing may be available through NRCS/EQIP.`
            },
            {
                title: "(Firebreak Construction / Access Lane Maintenance)",
                text: `(Firebreak Construction / Access Lane Maintenance)\nWell-planned and maintained access lanes or firebreaks are essential for property management and protection. They provide access for timber harvesting, TSI, firewood cutting, recreation, monitoring, and fire suppression equipment.\n•\tLayout: Plan routes to minimize grading, follow contours where possible, and avoid steep slopes (>15-20%) and wet areas. Keep grades below 10% if possible.\n•\tConstruction/Maintenance: Maintain a width of 10-14 feet, clear of flammable vegetation. Install water bars, broad-based dips, or other water diversion structures according to BMPs on any sloped sections to prevent erosion. Seed disturbed areas with appropriate ground cover (e.g., wildlife mix, conservation grass mix). Regularly inspect and clear debris or encroaching vegetation. KDF personnel can provide technical assistance on layout and construction.`
            },
             {
                title: "(Riparian Area / Streamside Management Zone)", // Changed title slightly for consistency
                text: `(Riparian Area / Streamside Management Zone)\nMaintain a protected vegetated buffer along all perennial and intermittent streams, rivers, lakes, and ponds. This Streamside Management Zone (SMZ) is critical for water quality protection, bank stabilization, aquatic habitat, and terrestrial wildlife corridors.\n•\tWidth: Minimum recommended width is 50 feet on each side of the stream (measured from the top of the bank), wider on steeper slopes or more sensitive streams.\n•\tManagement: Avoid significant disturbance within the SMZ. Limit equipment operation and tree removal. If harvesting occurs, Kentucky BMPs require retaining at least 50% of the original tree canopy cover. Focus on removing only high-risk or specific undesirable trees. Avoid road construction or log landings within the SMZ. If planting is needed to establish or enhance the buffer, use native bottomland tree and shrub species.`
            },
             { // Combined the two pruning recommendations into one, matching the input text's final structure
                 title: "(Pruning)",
                 text: `(Pruning)\nPrune lower branches on selected high-value hardwood crop trees (especially Black Walnut, also Oak, Cherry) in plantations or open-grown settings during the dormant season. The goal is to develop clear, knot-free lower logs (typically 10-17 feet) to significantly increase future timber value. Use proper pruning techniques (e.g., 3-cut method, cutting outside the branch collar) and avoid removing too much of the live crown at once (<1/3). Best done on younger trees (<6-8" DBH) before lower limbs become large.\n\n(Previous version text, if needed for reference: To improve the future quality and value of high-value hardwood logs growing in relatively open conditions or plantations, consider pruning lower branches on selected crop trees.\n•\tGoal: Develop a clear, knot-free log section, typically the first 9 or 17 feet.\n•\tTechnique: Prune during the dormant season. Remove branches flush with the branch collar (do not leave stubs or cut into the trunk). Use sharp tools (hand saw, pole saw). Never remove more than 1/3 of the live crown height at one time. Maintain at least 40-50% live crown ratio.\n•\tTiming: Best done on younger trees (typically < 6-8 inches DBH) before lower branches become too large (>2-3 inches diameter). Multiple light prunings over several years are better than one heavy pruning. See "Proper Pruning Techniques" handout.)`
            },
            {
                title: "(Wildlife Habitat - General Enhancements)",
                text: `(Wildlife Habitat - General Enhancements)\nIn addition to managing the forest structure, consider these practices to benefit wildlife:\n•\tSnags/Den Trees: Retain several standing dead trees (snags) and live trees with cavities (den trees) per acre (e.g., 2-5) during TSI and harvesting operations, provided they don't pose a safety risk. These provide critical habitat for birds, mammals, reptiles, and amphibians.\n•\tMast Production: Favor a diversity of hard mast (oaks, hickory, beech, walnut) and soft mast (black cherry, persimmon, dogwood, serviceberry, blackberry, etc.) producing trees and shrubs during management activities.\n•\tEdge Management: Maintain soft edges between forests and fields (feathering) rather than hard, abrupt lines. Allow native shrubs and grasses to transition into the woodland.\n•\tKDFWR Contact: For specific habitat improvement recommendations tailored to target wildlife species (e.g., quail, turkey, deer, pollinators), contact your KDFWR Private Lands Biologist.`
            },
            {
                title: "(Establish/Maintain Native Grasses/Wildflowers/Pollinator Habitat)",
                text: `(Establish/Maintain Native Grasses/Wildflowers/Pollinator Habitat)\nConvert existing non-native grasses (especially fescue) in fields or open areas to native warm-season grasses (e.g., big bluestem, Indiangrass, little bluestem, switchgrass) and/or native wildflowers/forbs (pollinator habitat).\n•\tEstablishment: Requires site preparation (killing existing vegetation, often with herbicide), planting appropriate seed mixes (consult NRCS or KDFW for recommendations), and initial weed control.\n•\tMaintenance: Requires periodic disturbance (typically every 1-3 years) to maintain the desired habitat structure and prevent woody encroachment. Options include prescribed burning, strip disking, or rotational mowing (mow high, >8-12 inches, and time mowing outside of nesting season May 15-July 15).\n•\tBenefits: Provides superior habitat for quail, rabbits, deer, turkey, songbirds, and pollinators compared to fescue; improves soil health; enhances biodiversity and aesthetics. Cost-share assistance may be available.`
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
                text: `(Forest Succession & Estate Planning)\nForest management is a long-term investment often spanning multiple generations. Consider your long-term vision for the property and how it will be passed on. Discuss your stewardship goals and plans with family members or potential heirs. Explore estate planning tools (wills, trusts, conservation easements) that can help ensure the property remains intact and managed according to your wishes in the future. Resources on forest estate planning are available through UK Forestry Extension and organizations like the National Woodland Owners Association.`
            },
            {
                title: "(General Monitoring Recommendation)",
                text: `(General Monitoring Recommendation)\nActive stewardship requires regular monitoring. Walk your property periodically (at least once or twice per year) specifically to observe forest conditions.\n•\tCheck For: New storm damage, signs of insect or disease outbreaks (e.g., unusual leaf discoloration, dieback, insect emergence holes), new invasive species infestations (especially along edges, trails, streams, disturbed areas), boundary line conditions, signs of trespass or unauthorized activity (e.g., dumping, timber theft, ATV use), and the general health and vigor of your trees and regeneration.\n•\tAction: Early detection allows for timely and often less costly management responses. Document observations and contact your forester if you notice significant changes or have concerns.`
            },
            // Added missing items from the provided text
             {
                 title: "(Glade/Prairie Restoration)",
                 text: `(Glade/Prairie Restoration)\nIn areas identified as cedar glades or prairie remnants (often rocky, shallow soil sites with native grasses/wildflowers), actively manage to maintain or expand the open/semi-open conditions. This involves selectively removing or killing encroaching woody species (especially cedar, pine, and undesirable hardwoods) via cutting, girdling, or herbicide. The goal is to increase sunlight reaching the ground to promote the target herbaceous plant community and associated wildlife benefits (e.g., for quail, turkey poults, pollinators). Consider prescribed fire as a potential maintenance tool if feasible and appropriate expertise is available.`
             },
             {
                 title: "(Create Small Forest Openings)",
                 text: `(Create Small Forest Openings)\nCreate small openings (e.g., ¼ to ½ acre, or ~150 ft diameter) within the forest canopy, particularly in areas lacking structural diversity or desirable regeneration. This is achieved by felling or killing groups of low-quality or undesirable trees. These gaps mimic natural disturbances, stimulate understory growth (browse/cover), promote regeneration of certain tree species, and increase habitat diversity for wildlife like grouse, deer, and turkey.`
             }
            // Removed items not present in the new list:
            // - Boundary Line Maintenance (Content seems covered in General Monitoring)
            // - Sensitive Area Protection (Not explicitly in the new list)
        ]
    };


    // --- State Variables ---
    let selectedRecTitles = [];
    let placeholderValues = {};
    let flatRecList = {};

    // --- Descriptions & Data ---
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
    const countyNrcsInfo = {
        "Simpson": "(270) 586-4732", "Allen": "(270) 237-3180",
        "Barren": "(270) 629-6811", "Warren": "(270) 843-1111",
        "Hart": "(270) 524-5631"
    };

    // --- Get DOM Elements (Declare ALL here for clarity) ---
    const form = document.getElementById('forestryForm');
    const recTextarea = document.getElementById('generatedRecommendations');
    const editTemplateButton = document.getElementById('editTemplateButton');
    const viewFinalTxtButton = document.getElementById('viewFinalTxtButton');
    const submitButton = document.getElementById('submitButton'); // TXT save button
    const stockingLevelDropdown = document.getElementById('stockingLevel');
    const recButtonsContainer = document.getElementById('recommendationButtonsContainer');
    const nrcsCountySelect = document.getElementById('nrcsCountySelect');
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
    const pdfCheckboxesContainer = document.getElementById('pdfCheckboxesContainer');
    const downloadPdfsButton = document.getElementById('downloadPdfsButton'); // PDF zip download button
    const pdfDownloadStatus = document.getElementById('pdfDownloadStatus'); // PDF zip download status

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
        return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
    }
    function downloadBlob(blob, filename) { // Helper for Blob downloads (ZIP, potentially TXT)
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        console.log(`Blob download initiated for: ${filename}`);
    }
    function downloadTextFile(content, filename) { // Helper specifically for TXT download
        console.log(`Attempting text download for: ${filename}`);
        try {
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            downloadBlob(blob, filename); // Reuse blob downloader
        } catch (error) {
            console.error("Error in downloadTextFile:", error);
            alert("Error creating text file for download. See console.");
        }
    }

    // --- Placeholder Processing ---
    function processPlaceholders(text, placeholderStorage, selectedCounty, nrcsData) {
        const placeholderRegex = /\[\[(.*?)\]\]/g;
        let processedText = text; let continueProcessing = true;
        const uniquePlaceholdersInThisText = new Map();
        const matches = Array.from(text.matchAll(placeholderRegex)).map(match => ({
            full: match[0], innerTrimmed: match[1].trim()
        }));

        for (const matchInfo of matches) {
            if (!continueProcessing) break;
            const placeholderText = matchInfo.innerTrimmed;
            if (uniquePlaceholdersInThisText.has(placeholderText)) continue;

            let valueForThisBlock = null;
            if (placeholderText === "(Insert County Name)") {
                valueForThisBlock = selectedCounty || `[[${placeholderText}]]`;
            } else if (placeholderText === "(Insert NRCS Phone Number)") {
                valueForThisBlock = (selectedCounty && nrcsData[selectedCounty]) ? nrcsData[selectedCounty] : `[[${placeholderText}]]`;
            } else {
                const storedGenericValue = placeholderStorage[placeholderText];
                if (storedGenericValue !== undefined) {
                    if (storedGenericValue === null) {
                         console.warn(`Placeholder "${placeholderText}" previously cancelled.`);
                         continueProcessing = false; break;
                    }
                    valueForThisBlock = storedGenericValue;
                } else {
                    const userInput = prompt(`Please provide value for:\n"${placeholderText}"`);
                    if (userInput === null) {
                        console.warn(`User cancelled prompt for "${placeholderText}"`);
                        continueProcessing = false; placeholderStorage[placeholderText] = null; // Store cancellation
                        break;
                    } else {
                        valueForThisBlock = userInput; placeholderStorage[placeholderText] = valueForThisBlock;
                    }
                }
            }
            uniquePlaceholdersInThisText.set(placeholderText, valueForThisBlock);
        }

        if (continueProcessing) {
            uniquePlaceholdersInThisText.forEach((userInput, placeholderText) => {
                const escapedPlaceholderText = placeholderText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                processedText = processedText.replace(new RegExp(`\\[\\[\\s*${escapedPlaceholderText}\\s*\\]\\]`, 'g'), userInput);
            });
            return { text: processedText, cancelled: false };
        } else {
            return { text: text, cancelled: true };
        }
    }

    // --- Recommendation Text Area Regeneration ---
    function regenerateRecTextarea() {
        let output = []; let processingErrorOccurred = false;
        const currentSelectedCounty = nrcsCountySelect ? nrcsCountySelect.value : "";

        if (Object.keys(flatRecList).length === 0 && typeof allRecommendations !== 'undefined' && allRecommendations && Object.keys(allRecommendations).length > 0) {
             console.warn("Regenerate: flatRecList empty, repopulating...");
             Object.values(allRecommendations).forEach(cat => Array.isArray(cat) && cat.forEach(rec => { if(rec?.title) flatRecList[rec.title] = rec.text || ''; }));
        } else if (Object.keys(flatRecList).length === 0) {
            console.warn("Regenerate: Cannot proceed, flatRecList empty or recommendations missing.");
            if(recTextarea) recTextarea.value = '[Recommendations not loaded or empty]'; return;
        }

        selectedRecTitles.forEach(title => {
            if (processingErrorOccurred) return;
            const originalText = flatRecList[title];
            if (originalText !== undefined) {
                const { text: processedText, cancelled } = processPlaceholders(originalText, placeholderValues, currentSelectedCounty, countyNrcsInfo);
                if (!cancelled) { output.push(processedText); }
                else {
                    console.error(`Regenerate: Placeholder cancelled for "${title}". Removing.`);
                    processingErrorOccurred = true;
                    document.querySelector(`.rec-button[data-title="${title}"]`)?.classList.remove('selected');
                }
            } else { output.push(`[Error: Text missing for "${title}"]`); }
        });

        if (processingErrorOccurred) {
            selectedRecTitles = selectedRecTitles.filter(title => document.querySelector(`.rec-button[data-title="${title}"]`)?.classList.contains('selected'));
        }
        if(recTextarea) {
            recTextarea.value = output.join('\n\n');
            recTextarea.scrollTop = recTextarea.scrollHeight;
        } else { console.error("Recommendation textarea not found during regeneration."); }
    }

    // --- UI Population Functions ---
    function populateCountyDropdown() {
        if (!nrcsCountySelect) { console.error("County select not found."); return; }
        while (nrcsCountySelect.options.length > 1) nrcsCountySelect.remove(1);
        Object.keys(countyNrcsInfo).sort().forEach(name => { nrcsCountySelect.add(new Option(name, name)); });
        console.log("County dropdown populated.");
    }
    function populatePdfCheckboxes() {
        if (!pdfCheckboxesContainer) { console.error("PDF checkbox container not found."); return; }
        pdfCheckboxesContainer.innerHTML = '';
        referencePdfs.sort((a, b) => a.name.localeCompare(b.name));
        referencePdfs.forEach(pdf => {
            const div = document.createElement('div'); div.style.marginBottom = '5px';
            const safeId = `pdf_${pdf.value.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            div.innerHTML = `<input type="checkbox" id="${safeId}" name="referencePdf" value="${pdf.value}" style="margin-right: 5px;"><label for="${safeId}" style="margin-right: 10px;">${pdf.name}</label><a href="pdfs/${pdf.value}" target="_blank" rel="noopener noreferrer" style="font-size: 0.85em; text-decoration: none; color: #2E8B57;">[Download]</a>`;
            pdfCheckboxesContainer.appendChild(div);
        });
        console.log("PDF checkboxes populated.");
    }
    function populateRecommendationButtons() {
        if (typeof allRecommendations === 'undefined' || allRecommendations === null || Object.keys(allRecommendations).length === 0) {
            console.warn("Cannot populate recommendations: data is missing or empty.");
            if (recButtonsContainer) recButtonsContainer.innerHTML = '<p style="color: orange; font-weight: bold;">No recommendations available.</p>';
            flatRecList = {}; return;
        }
        if (!recButtonsContainer) { console.error("Recommendation button container not found."); return; }
        recButtonsContainer.innerHTML = ''; flatRecList = {};
        try {
            Object.entries(allRecommendations).forEach(([category, recs]) => {
                if (!Array.isArray(recs) || recs.length === 0) return;
                const header = document.createElement('h4'); header.textContent = category; header.className = 'rec-category-header expanded';
                const group = document.createElement('div'); group.className = 'rec-button-group'; group.style.display = 'flex';
                recs.forEach(rec => {
                    if (!rec?.title) { console.warn("Skipping rec without title:", rec); return; }
                    flatRecList[rec.title] = rec.text || '';
                    const btn = document.createElement('button'); btn.type = 'button'; btn.className = 'rec-button';
                    btn.textContent = rec.title; btn.dataset.title = rec.title; btn.title = rec.text || '';
                    if (selectedRecTitles.includes(rec.title)) btn.classList.add('selected');
                    group.appendChild(btn);
                });
                header.addEventListener('click', function() {
                    const associatedGroup = this.nextElementSibling;
                    if (associatedGroup?.classList.contains('rec-button-group')) {
                        const isExpanded = this.classList.toggle('expanded');
                        associatedGroup.style.display = isExpanded ? 'flex' : 'none';
                    }
                });
                recButtonsContainer.appendChild(header); recButtonsContainer.appendChild(group);
            });
             console.log("Recommendation buttons populated.");
             recButtonsContainer.addEventListener('click', handleRecommendationClick); // Add listener here
        } catch (e) {
            console.error("Error populating recommendations:", e);
            recButtonsContainer.innerHTML = '<p style="color: red; font-weight: bold;">Error loading recommendations.</p>';
        }
    }

    // --- Event Handler for Recommendation Button Clicks ---
    function handleRecommendationClick(event) {
         const targetButton = event.target;
         if (targetButton.classList.contains('rec-button')) {
             const title = targetButton.dataset.title;
             const isSelected = targetButton.classList.contains('selected');
             const originalText = flatRecList[title];
             if (isSelected) {
                 targetButton.classList.remove('selected');
                 selectedRecTitles = selectedRecTitles.filter(t => t !== title);
                 regenerateRecTextarea();
             } else if (originalText !== undefined) {
                 if (!selectedRecTitles.includes(title)) selectedRecTitles.push(title);
                 targetButton.classList.add('selected');
                 regenerateRecTextarea();
                 if (!targetButton.classList.contains('selected')) {
                     console.log(`Selection cancelled for "${title}" during placeholder prompt.`);
                     targetButton.style.backgroundColor = '#f8d7da'; setTimeout(() => { targetButton.style.backgroundColor = ''; }, 800);
                 }
             } else { console.warn(`Cannot select, text missing for: "${title}"`); }
         }
     }

    // --- Function to Toggle Soil Details Visibility (Attached to window) ---
    window.toggleSoilDetails = function(showOption1) {
        const details1 = document.getElementById('soilDetails1');
        const details2 = document.getElementById('soilDetails2');
        if (details1) details1.style.display = showOption1 ? 'block' : 'none';
        if (details2) details2.style.display = !showOption1 ? 'block' : 'none';
    };

    // --- Form Data Generation & Download ---
    function generateFinalText() {
        console.log("Generating final text...");
        try {
            const data = { // Gather all form data
                area: getElementValue('area'), acres: getElementValue('acres'), majorSpecies: getElementValue('majorSpecies'),
                selectedSizeClasses: getCheckedValuesArray('sizeClass'), stockingLevel: getElementValue('stockingLevel'),
                selectedStockingExplanation: getRadioValue('stockingExplanation'), treesPerAcre: getElementValue('treesPerAcre'),
                avgDbh: getElementValue('avgDbh'), basalArea: getElementValue('basalArea'), standHealth: getElementValue('standHealth'),
                invasiveSpecies: getElementValue('invasiveSpecies'), healthNotes: getElementValue('healthNotes'),
                timberQuality: getElementValue('timberQuality'), qualityNotes: getElementValue('qualityNotes'),
                regenSpecies: getElementValue('regenSpecies'), whiteOakHeight: getElementValue('whiteOakHeight'),
                blackOakSI: getElementValue('blackOakSI'), yellowPoplarSI: getElementValue('yellowPoplarSI'),
                siteProductivity: getElementValue('siteProductivity'), soilOption: getRadioValue('soilOption'),
                soilType: getRadioValue('soilOption') === '1' ? getElementValue('soilType1') : getElementValue('soilType2'),
                drainage: getRadioValue('soilOption') === '1' ? getElementValue('drainage1') : getElementValue('drainage2'),
                runoff: getRadioValue('soilOption') === '1' ? getElementValue('runoff1') : getElementValue('runoff2'),
                permeability: getRadioValue('soilOption') === '1' ? getElementValue('permeability1') : getElementValue('permeability2'),
                lastHarvestAge: getElementValue('lastHarvestAge'), historyNotes: getElementValue('historyNotes'),
                wildlifeValue: getRadioValue('wildlifeSuitability'),
                finalRecommendations: recTextarea?.value.trim() || '[No recommendations added.]',
                selectedPdfNames: getCheckedValuesArray('referencePdf')
            };

            // Build composite fields
            data.sizeClassText = formatListWithCommasAndAnd(data.selectedSizeClasses, '[No size class selected]');
            data.stockingExplanationText = data.selectedStockingExplanation ? (stockingExplanationDescriptions[data.selectedStockingExplanation] || data.selectedStockingExplanation) : '[No stocking explanation selected]';
            data.wildlifeSectionText = data.wildlifeValue ? (wildlifeDescriptions[data.wildlifeValue] || data.wildlifeValue) : '[No wildlife condition selected]';
            data.invasiveTreatmentNote = data.invasiveSpecies ? "Invasive species should be treated as soon as feasible and the area monitored for additional spread." : "";
            data.selectedPdfs = data.selectedPdfNames.length > 0 ? data.selectedPdfNames.map(filename => `• ${filename}`).join('\n') : '[None Selected]';

            // --- CORRECTED SOIL SECTION TEXT CONSTRUCTION ---
             const typeLabel = data.soilOption === '1' ? 'type' : 'types';
             const typeValue = data.soilType || '[N/A]';
             const drainageValue = data.drainage || '[N/A]';
             const runoffValue = data.runoff || '[N/A]';
             const permValue = data.permeability || '[N/A]';

             if (data.soilOption === '1' || data.soilOption === '2') {
                  // Build the sentence structure correctly here
                  data.soilSectionText = `The primary soil ${typeLabel} in this area are ${typeValue}. This soil type is ${drainageValue} drained with ${runoffValue} runoff and ${permValue} permeability.`;
             } else {
                  data.soilSectionText = '[No soil option selected]';
             }
             // --- END CORRECTED SOIL SECTION ---

            // Template substitution
            let finalText = baseTemplate;
            const placeholderRegex = /\$\{\s*(\w+)\s*(?:\|\|.*?)*?\s*\}/g;
            finalText = finalText.replace(placeholderRegex, (match, key) => {
                const value = data.hasOwnProperty(key) ? data[key] : undefined;
                const allowEmpty = ['healthNotes', 'qualityNotes', 'historyNotes', 'invasiveTreatmentNote', 'finalRecommendations', 'selectedPdfs'].includes(key);
                if (value !== undefined && value !== null && value !== '') return value;
                if (allowEmpty && (value === '' || value === null || value === undefined)) return '';
                if (key === 'selectedPdfs') return '[None Selected]';
                if (key === 'soilSectionText') return data.soilSectionText; // Use the constructed value
                return '[N/A]';
            });

            console.log("Final text generated successfully.");
            return finalText.trim();
        } catch (error) {
            console.error("Error generating final text:", error);
            alert("Failed to generate text content. See console."); return null;
        }
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

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        // Main Action Buttons
        if(editTemplateButton) editTemplateButton.addEventListener('click', () => { if(templateEditTextarea) templateEditTextarea.value = baseTemplate; openModal(editTemplateModal); });
        if(viewFinalTxtButton) viewFinalTxtButton.addEventListener('click', () => { const finalText = generateFinalText(); if(finalTxtEditTextarea && finalText !== null) finalTxtEditTextarea.value = finalText; openModal(viewFinalTxtModal); });
        if(submitButton) submitButton.addEventListener('click', () => { const finalText = generateFinalText(); if (finalText !== null) downloadTextFile(finalText, generateFilename()); });
        else { console.error("Submit button (TXT save) not found!"); }

        // PDF Zip Download Button
        if (downloadPdfsButton) downloadPdfsButton.addEventListener('click', handlePdfZipDownload);
        else { console.warn("PDF download button not found."); }

        // Modal Buttons & Interactions
        if(saveTemplateChangesButton) saveTemplateChangesButton.addEventListener('click', () => { if(templateEditTextarea) baseTemplate = templateEditTextarea.value; closeModal(editTemplateModal); });
        if(saveFinalTxtButton) saveFinalTxtButton.addEventListener('click', () => { const editedText = finalTxtEditTextarea?.value || ''; downloadTextFile(editedText, generateFilename()); closeModal(viewFinalTxtModal); });
        if(closeTemplateModalButton) closeTemplateModalButton.addEventListener('click', () => closeModal(editTemplateModal));
        if(closeFinalTxtModalButton) closeFinalTxtModalButton.addEventListener('click', () => closeModal(viewFinalTxtModal));
        cancelTemplateModalButtons.forEach(btn => btn.addEventListener('click', () => closeModal(editTemplateModal)));
        cancelFinalTxtModalButtons.forEach(btn => btn.addEventListener('click', () => closeModal(viewFinalTxtModal)));
        window.addEventListener('click', (event) => { if (event.target == editTemplateModal) closeModal(editTemplateModal); if (event.target == viewFinalTxtModal) closeModal(viewFinalTxtModal); });

        // County Dropdown Change
        if (nrcsCountySelect) nrcsCountySelect.addEventListener('change', regenerateRecTextarea);

        // Stocking Level Dropdown -> Hidden Radios
        if (stockingLevelDropdown) {
             stockingLevelDropdown.addEventListener('change', () => {
                 const targetMap = { 'fully': 'Fully stocked', 'over': 'Over stocked', 'under': 'Under stocked' };
                 const targetValue = targetMap[stockingLevelDropdown.value] || '';
                 document.querySelectorAll(`#stockingExplanationRadios input[name="stockingExplanation"]`)
                     .forEach(radio => { radio.checked = (radio.value === targetValue); });
             });
         }

        // Collapsible Notes Toggle Buttons
         noteToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const txtArea = button.closest('.collapsible-section')?.querySelector('.notes-textarea');
                if (txtArea) { const isHidden = txtArea.style.display === 'none'; txtArea.style.display = isHidden ? 'block' : 'none'; button.textContent = isHidden ? '+' : '−'; } // Corrected toggle symbols
            });
            const label = button.closest('.collapsible-header')?.querySelector('label');
            if (label) { label.style.cursor = 'pointer'; label.addEventListener('click', () => button.click()); }
        });

        console.log("All event listeners set up.");
    }

    // --- PDF Zip Download Handler ---
    async function handlePdfZipDownload() {
        const selectedPdfFiles = getCheckedValuesArray('referencePdf');
        if (selectedPdfFiles.length === 0) { if (pdfDownloadStatus) pdfDownloadStatus.textContent = 'No PDFs selected.'; setTimeout(() => { if (pdfDownloadStatus) pdfDownloadStatus.textContent = ''; }, 3000); return; }
        if (typeof JSZip === 'undefined') { if (pdfDownloadStatus) pdfDownloadStatus.textContent = 'Error: Zip library not loaded.'; return; }
        if (pdfDownloadStatus) pdfDownloadStatus.textContent = `Fetching (0/${selectedPdfFiles.length})...`;
        if (downloadPdfsButton) downloadPdfsButton.disabled = true;
        const zip = new JSZip(); let filesFetched = 0; const fetchErrors = [];
        const fetchPromises = selectedPdfFiles.map(filename => fetch(`pdfs/${filename}`).then(response => { if (!response.ok) throw new Error(`${response.statusText} (${filename})`); return response.blob(); }).then(blob => { filesFetched++; zip.file(filename, blob); return { success: true }; }).catch(error => { console.error(error); fetchErrors.push(filename); return { success: false }; }).finally(() => { if (pdfDownloadStatus) pdfDownloadStatus.textContent = `Fetching (${filesFetched}/${selectedPdfFiles.length})...`; }));
        await Promise.allSettled(fetchPromises);
        if (filesFetched === 0) { if (pdfDownloadStatus) pdfDownloadStatus.textContent = 'Failed to fetch any PDFs.'; }
        else {
            const statusMsg = fetchErrors.length > 0 ? `Errors fetching: ${fetchErrors.join(', ')}. Zipping...` : 'Zipping files...';
            if (pdfDownloadStatus) pdfDownloadStatus.textContent = statusMsg;
            try {
                const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
                downloadBlob(zipBlob, 'selected_forestry_pdfs.zip');
                if (pdfDownloadStatus) pdfDownloadStatus.textContent = fetchErrors.length > 0 ? 'Partial ZIP Downloaded!' : 'ZIP Downloaded!';
            } catch (error) { console.error("Error generating ZIP:", error); if (pdfDownloadStatus) pdfDownloadStatus.textContent = 'Error creating ZIP.'; }
        }
        if (downloadPdfsButton) downloadPdfsButton.disabled = false;
        setTimeout(() => { if (pdfDownloadStatus) pdfDownloadStatus.textContent = ''; }, 5000);
    }

    // --- Initialization ---
    try {
        populateCountyDropdown();
        populateRecommendationButtons();
        populatePdfCheckboxes();
        const initialSoilValue = getRadioValue('soilOption');
        toggleSoilDetails(initialSoilValue === '1');
        if (stockingLevelDropdown) stockingLevelDropdown.dispatchEvent(new Event('change'));
        noteToggleButtons.forEach(button => {
            const textarea = button.closest('.collapsible-section')?.querySelector('.notes-textarea');
            if (textarea) { textarea.style.display = 'none'; button.textContent = '+'; }
        });
        setupEventListeners();
        console.log("Forestry Plan App Initialized Successfully.");
    } catch (error) {
        console.error("Initialization Error:", error);
        alert("Error initializing the application. Check console.");
    }

}); // End DOMContentLoaded

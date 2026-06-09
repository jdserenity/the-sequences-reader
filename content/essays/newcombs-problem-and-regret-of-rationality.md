# Newcomb’s Problem and Regret of Rationality 

[Source][1][Markdown][2] · [Talk][3] 

[Home][4][About][5][Search][6][Contents][7] 

# Newcomb’s Problem and Regret of Rationality

❦ 

The following may well be the most controversial dilemma in the history of decision theory: 

> A superintelligence from another galaxy, whom we shall call Omega, comes to Earth and sets about playing a strange little game. In this game, Omega selects a human being, sets down two boxes in front of them, and flies away. 
> 
> Box *A* is transparent and contains a thousand dollars. 
> 
> Box *B* is opaque, and contains either a million dollars, or nothing. 
> 
> You can take both boxes, or take only box *B*. 
> 
> And the twist is that Omega has put a million dollars in box *B* if and only if Omega has predicted that you will take only box *B*. 
> 
> Omega has been correct on each of 100 observed occasions so far—everyone who took both boxes has found box *B* empty and received only a thousand dollars; everyone who took only box *B* has found *B* containing a million dollars. (We assume that box *A* vanishes in a puff of smoke if you take only box *B*; no one else can take box *A* afterward.) 
> 
> Before you make your choice, Omega has flown off and moved on to its next game. Box *B* is already empty or already full. 
> 
> Omega drops two boxes on the ground in front of you and flies off. 
> 
> Do you take both boxes, or only box *B*? 

And the standard philosophical conversation runs thusly: 

> One-boxer: “I take only box *B*, of course. I’d rather have a million than a thousand.” 
> 
> Two-boxer: “Omega has already left. Either box *B* is already full or already empty. If box *B* is already empty, then taking both boxes nets me $1,000, taking only box *B* nets me $0. If box *B* is already full, then taking both boxes nets $1,001,000, taking only box *B* nets $1,000,000. In either case I do better by taking both boxes, and worse by leaving a thousand dollars on the table—so I will be rational, and take both boxes.” 
> 
> One-boxer: “If you’re so rational, why ain’cha rich?” 
> 
> Two-boxer: “It’s not my fault Omega chooses to reward only people with irrational dispositions, but it’s already too late for me to do anything about that.” 

There is a *large* literature on the topic of Newcomblike problems—especially if you consider the Prisoner’s Dilemma as a special case, which it is generally held to be. *Paradoxes of Rationality and Cooperation: Prisoner’s Dilemma and Newcomb’s Problem*[1][8] is an edited volume that includes Newcomb’s original essay. For those who read only online material, [Ledwig’s PhD thesis][9] summarizes the major standard positions.[2][10] 

I’m not going to go into the whole literature, but the dominant consensus in modern decision theory is that one should two-box, and Omega is just rewarding agents with irrational dispositions. This dominant view goes by the name of “causal decision theory.” 

I’m not going to try to present [my own analysis][11] here. Way too long a story, even by my standards. 

But it is agreed even among causal decision theorists that if you have the power to precommit yourself to take one box, in Newcomb’s Problem, then you should do so. If you can precommit yourself before Omega examines you, then you are directly causing box *B* to be filled. 

Now in my field—which, in case you have forgotten, is self-modifying AI— this works out to saying that if you build an AI that two-boxes on Newcomb’s Problem, it will self-modify to one-box on Newcomb’s Problem, if the AI considers in advance that it might face such a situation. Agents with free access to their own source code have access to a cheap method of precommitment. 

What if you expect that you might, in general, face a Newcomblike problem, without knowing the exact form of the problem? Then you would have to modify yourself into a sort of agent whose disposition was such that it would generally receive high rewards on Newcomblike problems. 

But what does an agent with a disposition generally-well-suited to Newcomblike problems look like? Can this be formally specified? 

Yes, but when I tried to write it up, I realized that I was starting to write a small book. And it wasn’t the most important book I had to write, so I shelved it. My slow writing speed really is the bane of my existence. The theory I worked out seems, to me, to have many nice properties besides being well-suited to Newcomblike problems. It would make a nice PhD thesis, if I could get someone to accept it as my PhD thesis. But that’s pretty much what it would take to make me unshelve the project. Otherwise I can’t justify the time expenditure, not at the speed I currently write books. 

I say all this, because there’s a common attitude that “Verbal arguments for one-boxing are easy to come by; what’s hard is developing a good decision theory that one-boxes”—coherent math which one-boxes on Newcomb’s Problem without producing absurd results elsewhere. So I do understand that, and I did set out to develop such a theory, but my writing speed on big papers is so slow that I can’t publish it. Believe it or not, it’s true. 

Nonetheless, I would like to present some of my *motivations* on Newcomb’s Problem—the reasons I felt impelled to seek a new theory—because they illustrate my source-attitudes toward rationality. Even if I can’t present the theory that these motivations motivate… 

First, foremost, fundamentally, above all else: 

Rational agents should WIN. 

Don’t mistake me, and think that I’m talking about the Hollywood Rationality stereotype that rationalists should be selfish or shortsighted. If your utility function has a term in it for others, then win their happiness. If your utility function has a term in it for a million years hence, then win the eon. 

But at any rate, *WIN*. Don’t lose reasonably; ***WIN***. 

Now there are defenders of causal decision theory who argue that the two-boxers are doing their best to win, and cannot help it if they have been cursed by a Predictor who favors irrationalists. I will talk about this defense in a moment. But first, I want to draw a distinction between causal decision theorists who believe that two-boxers are genuinely doing their best to win; versus someone who thinks that two-boxing is the *reasonable* or the *rational* thing to do, but that the reasonable move just happens to predictably lose, in this case. There are a *lot* of people out there who think that rationality predictably loses on various problems—that, too, is part of the Hollywood Rationality stereotype, that Kirk is predictably superior to Spock. 

Next, let’s turn to the charge that Omega favors irrationalists. I can conceive of a superbeing who rewards only people born with a particular gene, *regardless of their choices*. I can conceive of a superbeing who rewards people whose brains inscribe the *particular algorithm* of “Describe your options in English and choose the last option when ordered alphabetically,” but who does not reward anyone who chooses the same option for a different reason. But Omega rewards people who choose to take only box *B*, *regardless of which algorithm they use to arrive at this decision*, and this is why I don’t buy the charge that Omega is rewarding the irrational. Omega doesn’t care whether or not you follow some particular ritual of cognition; Omega only cares about your predicted *decision*. 

We can choose whatever reasoning algorithm we like, and will be rewarded or punished only according to that algorithm’s choices, with no other dependency—Omega just cares where we go, not how we got there. 

It is precisely the notion that Nature does not care about our *algorithm* that frees us up to pursue the winning Way—without attachment to any particular ritual of cognition, apart from our belief that it wins. Every rule is up for grabs, *except* the rule of winning. 

As Miyamoto Musashi said—it’s really worth repeating: 

> You can win with a long weapon, and yet you can also win with a short weapon. In short, the Way of the Ichi school is the spirit of winning, whatever the weapon and whatever its size.[3][12] 

(Another example: It was [argued by McGee][13] that we must adopt bounded utility functions or be subject to “Dutch books” over infinite times. But: *The utility function is not up for grabs*. I love life [without limit or upper bound][14]; there is no finite amount of life lived *N* where I would prefer an 80.0001% probability of living *N* years to a 0.0001% chance of living a googolplex years and an 80% chance of living forever. This is a sufficient condition to imply that my utility function is unbounded. So I just have to figure out how to optimize *for that morality*. You can’t tell me, first, that above all I must conform to a particular ritual of cognition, and then that, if I conform to that ritual, I must change my morality to avoid being Dutch-booked. Toss out the losing ritual; don’t change the definition of winning. That’s like deciding to prefer $1,000 to $1,000,000 so that Newcomb’s Problem doesn’t make your preferred ritual of cognition look bad.) 

“But,” says the causal decision theorist, “to take only one box, you must somehow believe that your choice can affect whether box *B* is empty or full—and that’s *unreasonable*! Omega has already left! It’s physically impossible!” 

Unreasonable? I am a rationalist: what do I care about being unreasonable? I don’t have to conform to a particular ritual of cognition. I don’t have to take only box *B* *because I believe my choice affects the box, even though Omega has already left*. I can just… take only box *B*. 

I do have a proposed alternative ritual of cognition that computes this decision, which this margin is too small to contain; but I shouldn’t need to show this to you. The point is not to have an elegant theory of winning—the point is to win; elegance is a side effect. 

Or to look at it another way: Rather than starting with a concept of what is the reasonable decision, and then asking whether “reasonable” agents leave with a lot of money, start by looking at the agents who leave with a lot of money, develop a theory of which agents tend to leave with the most money, and from this theory, try to figure out what is “reasonable.” “Reasonable” may just refer to decisions in conformance with our current ritual of cognition—what else would determine whether something seems “reasonable” or not? 

From James Joyce (no relation), *Foundations of Causal Decision Theory*:[4][15] 

> Rachel has a perfectly good answer to the “Why ain’t you rich?” question. “I am not rich,” she will say, “because I am not the kind of person the psychologist thinks will refuse the money. I’m just not like you, Irene. Given that I know that I am the type who takes the money, and given that the psychologist knows that I am this type, it was reasonable of me to think that the $1,000,000 was not in my account. The $1,000 was the most I was going to get no matter what I did. So the only reasonable thing for me to do was to take it.” 
> 
> Irene may want to press the point here by asking, “But don’t you wish you were like me, Rachel? Don’t you wish that you were the refusing type?” There is a tendency to think that Rachel, a committed causal decision theorist, must answer this question in the negative, which seems obviously wrong (given that being like Irene would have made her rich). This is not the case. Rachel can and should admit that she does wish she were more like Irene. “It would have been better for me,” she might concede, “had I been the refusing type.” At this point Irene will exclaim, “You’ve admitted it! It wasn’t so smart to take the money after all.” Unfortunately for Irene, her conclusion does not follow from Rachel’s premise. Rachel will patiently explain that wishing to be a refuser in a Newcomb problem is not inconsistent with thinking that one should take the $1,000 *whatever type one is*. When Rachel wishes she was Irene’s type she is wishing *for Irene’s options*, not sanctioning her choice. 

It is, I would say, a general principle of rationality—indeed, part of how I *define* rationality—that you never end up envying someone else’s mere *choices*. You might envy someone their genes, if Omega rewards genes, or if the genes give you a generally happier disposition. But Rachel, above, envies Irene her choice, and *only* her choice, irrespective of what algorithm Irene used to make it. Rachel wishes *just* that she had a disposition to choose differently. 

You shouldn’t claim to be more rational than someone and simultaneously envy them their choice—*only* their choice. Just *do* the act you envy. 

I keep trying to say that rationality is the winning-Way, but causal decision theorists insist that taking both boxes is what *really* wins, because you *can’t possibly do better* by leaving $1,000 on the table… even though the single-boxers leave the experiment with more money. Be careful of this sort of argument, any time you find yourself defining the “winner” as someone other than the agent who is currently smiling from on top of a giant heap of utility. 

Yes, there are various thought experiments in which some agents start out with an advantage—but if the task is to, say, decide whether to jump off a cliff, you want to be careful not to define cliff-refraining agents as having an unfair prior advantage over cliff-jumping agents, by virtue of their unfair refusal to jump off cliffs. At this point you have covertly redefined “winning” as conformance to a particular ritual of cognition. *Pay attention to the money!* 

Or here’s another way of looking at it: Faced with Newcomb’s Problem, would you want to look really hard for a reason to believe that it was perfectly reasonable and rational to take only box *B*; because, if such a line of argument existed, you would take only box *B* and find it full of money? Would you spend an extra hour thinking it through, if you were confident that, at the end of the hour, you would be able to convince yourself that box *B* was the rational choice? This too is a rather odd position to be in. Ordinarily, the work of rationality goes into figuring out which choice is the best—not finding a reason to believe that a particular choice is the best. 

Maybe it’s too easy to say that you “ought to” two-box on Newcomb’s Problem, that this is the “reasonable” thing to do, so long as the money isn’t actually in front of you. Maybe you’re just numb to philosophical dilemmas, at this point. What if your daughter had a 90% fatal disease, and box *A* contained a serum with a 20% chance of curing her, and box *B* might contain a serum with a 95% chance of curing her? What if there was an asteroid rushing toward Earth, and box *A* contained an asteroid deflector that worked 10% of the time, and box *B* might contain an asteroid deflector that worked 100% of the time? 

Would you, at that point, find yourself *tempted to make an unreasonable choice*? 

If the stake in box *B* was [something you *could not* leave behind][16]? Something overwhelmingly more important to you than being reasonable? If you absolutely *had* to win—*really* win, not just be defined as winning? 

Would you *wish with all your power* that the “reasonable” decision were to take only box *B*? 

Then maybe it’s time to update your definition of reasonableness. 

Alleged rationalists should not find themselves envying the mere decisions of alleged nonrationalists, because your decision can be whatever you like. When you find yourself in a position like this, you shouldn’t chide the other person for failing to conform to your concepts of reasonableness. You should realize you got the Way wrong. 

So, too, if you ever find yourself keeping separate track of the “reasonable” belief, versus the belief that seems likely to be actually *true*. Either you have misunderstood reasonableness, or your second intuition is just wrong. 

Now one can’t simultaneously *define* “rationality” as the winning Way, and *define* “rationality” as Bayesian probability theory and decision theory. But it is the argument that I am putting forth, and the moral of my advice to [trust in Bayes][13], that the laws governing winning have indeed proven to be [math][17]. If it ever turns out that Bayes fails—receives systematically lower rewards on some problem, relative to a superior alternative, in virtue of its mere decisions—then Bayes has to go *out the window*. “Rationality” is just the label I use for my beliefs about the winning Way—the Way of the agent smiling from on top of the giant heap of utility. *Currently*, that label refers to Bayescraft. 

I realize that this is not a knockdown criticism of causal decision theory— that would take the actual book and/or PhD thesis—but I hope it illustrates some of my underlying attitude toward this notion of “rationality.” 

[Edit 2015: I’ve now written a book-length exposition of a decision theory that dominates causal decision theory, “[Timeless Decision Theory][18].”[5][19] The cryptographer Wei Dai has responded with another alternative to causal decision theory, updateless decision theory, that dominates both causal and timeless decision theory. As of 2015, the best up-to-date discussions of these theories are Daniel Hintze’s “[Problem Class Dominance in Predictive Dilemmas][20]”[6][21] and Nate Soares and Benja Fallenstein’s “[Toward Idealized Decision Theory][22].”[7][23]] 

You shouldn’t find yourself distinguishing the winning choice from the reasonable choice. Nor should you find yourself distinguishing the reasonable belief from the belief that is most likely to be true. 

That is why I use the word “rational” to denote my beliefs about accuracy and winning—*not* to denote [verbal][24] reasoning, or strategies which yield [certain][25] success, or that which is [logically][26] provable, or that which is [publicly demonstrable][27], or that which is reasonable. 

As Miyamoto Musashi said: 

> The primary thing when you take a sword in your hands is your intention to cut the enemy, whatever the means. Whenever you parry, hit, spring, strike or touch the enemy’s cutting sword, you must cut the enemy in the same movement. It is essential to attain this. If you think only of hitting, springing, striking or touching the enemy, you will not be able actually to cut him. 

[![][https://www.readthesequences.com/wiki/uploads/star.svg]][28]

  Richmond Campbell and Lanning Snowden, eds., Paradoxes of Rationality and Cooperation: Prisoner’s Dilemma and Newcomb’s Problem (Vancouver: University of British Columbia Press, 1985). [↩︎][29] 

  Marion Ledwig, “Newcomb’s Problem” (PhD diss., University of Constance, 2000). [↩︎][30] 

  Musashi, Book of Five Rings. [↩︎][31] 

  James M. Joyce, The Foundations of Causal Decision Theory (New York: Cambridge University Press, 1999), doi:10.1017/CBO9780511498497. [↩︎][32] 

  Yudkowsky, Timeless Decision Theory. [↩︎][33] 

  Daniel Hintze, “Problem Class Dominance in Predictive Dilemmas,” Honors thesis (2014). [↩︎][34] 

  Nate Soares and Benja Fallenstein, “Toward Idealized Decision Theory,” Technical report. Berkeley, CA: Machine Intelligence Research Institute (2014), http : / / intelligence.org/files/TowardIdealizedDecisionTheory.pdf. [↩︎][35] 

[When (Not) to Use Probabilities][36] 

[Top][7] 

[Book][37] 

[Sequence][38] 

[*Interlude:* The Twelve Virtues of Rationality][39]

 [1]: https://www.readthesequences.com/Newcombs-Problem-And-Regret-Of-Rationality?action=source "View PmWiki source for “Newcomb’s Problem and Regret of Rationality”"
 [2]: https://www.readthesequences.com/Newcombs-Problem-And-Regret-Of-Rationality?action=markdown "View “Newcomb’s Problem and Regret of Rationality” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Newcombs-Problem-And-Regret-Of-Rationality "View the Talk page for “Newcomb’s Problem and Regret of Rationality”"
 [4]: https://www.readthesequences.com/
 [5]: https://www.readthesequences.com/About
 [6]: https://www.readthesequences.com/Search
 [7]: https://www.readthesequences.com/Contents
 [8]: #footnote1
 [9]: http://kops.ub.uni-konstanz.de/bitstream/handle/urn:nbn:de:bsz:352-opus-5241/ledwig.pdf?sequence=1
 [10]: #footnote2
 [11]: https://intelligence.org/files/TDT.pdf
 [12]: #footnote3
 [13]: https://www.greaterwrong.com/lw/na/trust_in_bayes/
 [14]: http://yudkowsky.net/singularity/simplified
 [15]: #footnote4
 [16]: https://www.readthesequences.com/SomethingToProtect
 [17]: https://www.readthesequences.com/BeautifulProbability
 [18]: http://intelligence.org/files/TDT.pdf
 [19]: #footnote5
 [20]: https://intelligence.org/wp-content/uploads/2014/10/Hintze-Problem-Class-Dominance-In-Predictive-Dilemmas.pdf
 [21]: #footnote6
 [22]: https://arxiv.org/abs/1507.01986
 [23]: #footnote7
 [24]: https://www.readthesequences.com/WhyTruthAnd
 [25]: https://www.readthesequences.com/TheFallacyOfGray
 [26]: https://www.readthesequences.com/APriori
 [27]: https://www.readthesequences.com/ScientificEvidenceLegalEvidenceRationalEvidence
 [28]: https://www.greaterwrong.com/lw/nc/newcombs_problem_and_regret_of_rationality#comments "View Less Wrong discussion thread for “Newcomb’s Problem and Regret of Rationality”"
 [29]: #citation1
 [30]: #citation2
 [31]: #citation3
 [32]: #citation4
 [33]: #citation5
 [34]: #citation6
 [35]: #citation7
 [36]: https://www.readthesequences.com/WhenNotToUseProbabilities
 [37]: https://www.readthesequences.com/Book-V-MereGoodness
 [38]: https://www.readthesequences.com/QuantifiedHumanismSequence
 [39]: https://www.readthesequences.com/TheTwelveVirtuesOfRationality
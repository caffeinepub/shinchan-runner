import Runtime "mo:core/Runtime";

actor {
  var scores : [Nat] = [];

  public query ({ caller }) func getScore(id : Nat) : async Nat {
    if (id >= scores.size()) {
      Runtime.trap("This score does not exist. ");
    } else {
      scores[id];
    };
  };

  public shared ({ caller }) func addScore(score : Nat) : async () {
    scores := scores.concat([score]);
  };
};

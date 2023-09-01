require "List.i"

// Concatenation of lists is performed in linear time
// with respect to its first argument.
// Constant time concatenation is possible
// with difference-lists: the idea consists in
// plugging the front of the second argument
// at the back of the first one.

type DiffList Type -- Type end

node diff
  'A List :front
  -------
  'A List :back
  'A DiffList :value!
end

node diff_append
  'A DiffList :target!
  'A DiffList :rest
  --------
  'A DiffList :return
end

node diff_open
  'A DiffList :target!
  'A List :list
  ----------
  'A List :return
end

rule diff diff_append
  (diff)-front diff return-(diff_append)
  (diff_append)-rest diff_open back-(diff)
end

rule diff diff_open
  (diff)-back list-(diff_open)
  (diff)-front return-(diff_open)
end

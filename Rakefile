# Hook-friendly task aliases for local quality checks.
#
# These intentionally wrap the existing bin/pipeline entrypoints so local git
# hooks and CI can share the same commands.

require "rake"

desc "Run local test gate (RSpec + QUnit via bin/pipeline)"
task "hook:test" do
  sh "./bin/pipeline test"
end

desc "Run built-output validation gate (semantic + HTML checks)"
task "hook:validate" do
  sh "./bin/pipeline validate"
end

desc "Run Markdown linting (requires markdownlint-cli2 in node_modules)"
task "hook:markdownlint" do
  sh "npx markdownlint-cli2"
end


class RunTestsOutputParser

  def parse(kata, output)
    output = output.to_s
    inc = { :info => output.split("\n").join("<br/>") }
    if Regexp.new("execution terminated after ").match(output)
      inc[:outcome] = :timeout
    else
      inc[:outcome] = eval "parse_#{kata.unit_test_framework}(output)"
    end
    inc
  end

private

  def parse_cassert(output)
    failed_pattern = Regexp.new('(.*)Assertion(.*)failed.')
    syntax_error_pattern = Regexp.new(':(\d*): error')
    make_error_pattern = Regexp.new('^make:')
    if failed_pattern.match(output)
      :failed
    elsif make_error_pattern.match(output)
      :error
    elsif syntax_error_pattern.match(output)
      :error
    else
      :passed
    end
  end

  def parse_ruby_test_unit(output)
    ruby_pattern = Regexp.new('^(\d*) tests, (\d*) assertions, (\d*) failures, (\d*) errors')
    if match = ruby_pattern.match(output)
      if match[4] != "0"
        :error
      elsif match[3] != "0"
        :failed
      else
        :passed
      end
    else
      :error
    end
  end

  def parse_nunit(output)
    nunit_pattern = Regexp.new('^Tests run: (\d*), Failures: (\d*)')
    if match = nunit_pattern.match(output)
      if match[2] == "0"
        :passed
      else
        :failed
      end
    else
      :error
    end
  end

  def parse_junit(output)
    junit_pass_pattern = Regexp.new('^OK \((\d*) test')
    if match = junit_pass_pattern.match(output)
      if match[1] != "0" 
        :passed 
      else # treat zero passes as a fail
        :failed 
      end
    else
      junit_fail_pattern = Regexp.new('^Tests run: (\d*),  Failures: (\d*)')
      if match = junit_fail_pattern.match(output)
        :failed 
      else
        :error
      end
    end
  end

end



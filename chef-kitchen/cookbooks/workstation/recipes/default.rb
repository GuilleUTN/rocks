#
# Cookbook:: workstation
# Recipe:: default
#
# Copyright:: 2018, Guillermo Gaete & Julian Ghiglieri, All Rights Reserved.

package 'tree' do
	action :install
end

package 'git' do
	action :remove
end

# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := gesture
DEFS_Debug := \
	'-DNODE_GYP_MODULE_NAME=gesture' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION' \
	'-DDEBUG' \
	'-D_DEBUG'

# Flags passed to all source files.
CFLAGS_Debug := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-I/usr/local/include/opencv \
	-I/usr/local/include \
	-Wall \
	-g \
	-w \
	-std=c++11 \
	-g \
	-O0

# Flags passed to only C files.
CFLAGS_C_Debug :=

# Flags passed to only C++ files.
CFLAGS_CC_Debug := \
	-std=gnu++0x

INCS_Debug := \
	-I/root/.node-gyp/5.3.0/include/node \
	-I/root/.node-gyp/5.3.0/src \
	-I/root/.node-gyp/5.3.0/deps/uv/include \
	-I/root/.node-gyp/5.3.0/deps/v8/include \
	-I$(srcdir)/node_modules/nan \
	-I$(srcdir)/admobilize-detection-manager/lib/pico \
	-I$(srcdir)/src/libs \
	-I$(srcdir)/-I/usr/local/include/opencv \
	-I$(srcdir)/-I/usr/local/include

DEFS_Release := \
	'-DNODE_GYP_MODULE_NAME=gesture' \
	'-D_LARGEFILE_SOURCE' \
	'-D_FILE_OFFSET_BITS=64' \
	'-DBUILDING_NODE_EXTENSION'

# Flags passed to all source files.
CFLAGS_Release := \
	-fPIC \
	-pthread \
	-Wall \
	-Wextra \
	-Wno-unused-parameter \
	-m64 \
	-I/usr/local/include/opencv \
	-I/usr/local/include \
	-Wall \
	-g \
	-w \
	-std=c++11 \
	-O3 \
	-ffunction-sections \
	-fdata-sections \
	-fno-omit-frame-pointer

# Flags passed to only C files.
CFLAGS_C_Release :=

# Flags passed to only C++ files.
CFLAGS_CC_Release := \
	-std=gnu++0x

INCS_Release := \
	-I/root/.node-gyp/5.3.0/include/node \
	-I/root/.node-gyp/5.3.0/src \
	-I/root/.node-gyp/5.3.0/deps/uv/include \
	-I/root/.node-gyp/5.3.0/deps/v8/include \
	-I$(srcdir)/node_modules/nan \
	-I$(srcdir)/admobilize-detection-manager/lib/pico \
	-I$(srcdir)/src/libs \
	-I$(srcdir)/-I/usr/local/include/opencv \
	-I$(srcdir)/-I/usr/local/include

OBJS := \
	$(obj).target/$(TARGET)/admobilize-detection-manager/lib/pico/facedetect.o \
	$(obj).target/$(TARGET)/admobilize-detection-manager/lib/pico/uniqueness2.o \
	$(obj).target/$(TARGET)/admobilize-detection-manager/lib/pico/motiondetector.o \
	$(obj).target/$(TARGET)/src/gesture_manager.o \
	$(obj).target/$(TARGET)/src/gesture_manager_impl.o \
	$(obj).target/$(TARGET)/src/gesture_recognition.o

# Add to the list of files we specially track dependencies for.
all_deps += $(OBJS)

# CFLAGS et al overrides must be target-local.
# See "Target-specific Variable Values" in the GNU Make manual.
$(OBJS): TOOLSET := $(TOOLSET)
$(OBJS): GYP_CFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_C_$(BUILDTYPE))
$(OBJS): GYP_CXXFLAGS := $(DEFS_$(BUILDTYPE)) $(INCS_$(BUILDTYPE))  $(CFLAGS_$(BUILDTYPE)) $(CFLAGS_CC_$(BUILDTYPE))

# Suffix rules, putting all outputs into $(obj).

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(srcdir)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# Try building from generated source, too.

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj).$(TOOLSET)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

$(obj).$(TOOLSET)/$(TARGET)/%.o: $(obj)/%.cpp FORCE_DO_CMD
	@$(call do_cmd,cxx,1)

# End of this set of suffix rules
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS := \
	-L/usr/local/lib \
	-lopencv_shape \
	-lopencv_stitching \
	-lopencv_objdetect \
	-lopencv_superres \
	-lopencv_videostab \
	-lopencv_calib3d \
	-lopencv_features2d \
	-lopencv_highgui \
	-lopencv_videoio \
	-lopencv_imgcodecs \
	-lopencv_video \
	-lopencv_photo \
	-lopencv_ml \
	-lopencv_imgproc \
	-lopencv_flann \
	-lopencv_core

$(obj).target/gesture.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/gesture.node: LIBS := $(LIBS)
$(obj).target/gesture.node: TOOLSET := $(TOOLSET)
$(obj).target/gesture.node: $(OBJS) FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/gesture.node
# Add target alias
.PHONY: gesture
gesture: $(builddir)/gesture.node

# Copy this to the executable output path.
$(builddir)/gesture.node: TOOLSET := $(TOOLSET)
$(builddir)/gesture.node: $(obj).target/gesture.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/gesture.node
# Short alias for building this executable.
.PHONY: gesture.node
gesture.node: $(obj).target/gesture.node $(builddir)/gesture.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/gesture.node

